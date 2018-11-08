// dotenv loaded in models/index.js
import express from 'express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

import { sequelize } from './models';

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

server.applyMiddleware({ app });

sequelize.authenticate().then(() => {
  console.log('Connected to database established successfully.');
  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀  Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
});
