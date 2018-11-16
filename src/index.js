// dotenv loaded in models/index.js
import express from 'express';
import jwt from 'jsonwebtoken';

import http from 'http';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

import { sequelize, User } from './models';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    // Check connection for headers for subscriptions
    if (connection) {
      console.log('connection...');
      // const user = await User.findByPk(1);
      return {};
    }

    // get the user token from the headers
    const authorization = req.headers.authorization || '';
    const bearerLength = 'Bearer '.length;
    const token = authorization.slice(bearerLength) || '';

    // try to retrieve a user with the token
    const user = await getUser(token);

    // add the user to the context
    return { user };
  },
  subscriptions: {
    onConnect: (connectionParams, websocket) => {
      console.log('connectionParams:', connectionParams);
    },
  },
});
const app = express();

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

sequelize.authenticate().then(() => {
  console.log('Connected to database established successfully.');
  httpServer.listen({ port: 4000 }, () => {
    console.log(
      `🚀  Server ready at http://localhost:4000${server.graphqlPath}`
    );
    console.log(
      `🚀  Subscriptions ready at ws://localhost:4000${
        server.subscriptionsPath
      }`
    );
  });
});

const getUser = async token => {
  if (!token) {
    return null;
  }

  const { ok, result } = await new Promise(resolve =>
    jwt.verify(token, process.env.JWT_SECRET, (err, jwtResult) => {
      if (err) {
        resolve({
          ok: false,
          result: err,
        });
      } else {
        resolve({
          ok: true,
          result: jwtResult,
        });
      }
    })
  );

  if (ok) {
    const user = await User.findOne({ _id: result.id });
    return user;
  }
  return null;
};
