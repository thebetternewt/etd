// dotenv loaded in models/index.js

const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const voyagerMiddleware = require('graphql-voyager/middleware').express;
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { sequelize, User } = require('./models');

const getUserFromToken = async req => {
  // get the user token from the headers
  const authorization = req.headers.authorization || '';
  const bearerLength = 'Bearer '.length;
  const token = authorization.slice(bearerLength) || '';

  // try to retrieve a user with the token
  const user = await getUser(token);

  return user;
};

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

    const user = await getUserFromToken(req);

    // add the user to the context
    return { user };
  },
});
const app = express();

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.get('/api/submissions/:submissionId/:docPath', async (req, res) => {
  const { submissionId, docPath } = req.params;
  const fullPath = path.join('data', 'submissions', submissionId, docPath);
  const file = fs.createReadStream(fullPath);

  /* eslint-disable */
  // Set Content-Type header based on file extension
  const ext = docPath.split('.')[-1];
  switch (ext) {
    case '.pdf':
      res.setHeader('Content-Type', 'application/pdf');
      break;
    case '.doc':
      res.setHeader('Content-Type', 'application/msword');
      break;
    case '.docx':
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      break;

    default:
      break;
  }
  /* eslint-enable */

  file.pipe(res);
});

// Multer settings
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'application/msword'
  ) {
    return cb(null, true);
  }
  return cb(null, false);
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const { submissionId } = req.params;
    cb(null, `data/submissions/${submissionId}`);
  },
  filename(req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}.${ext}`);
  },
});

const submissionUpload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter,
}).any();

app.post('/api/upload-submission/:submissionId', (req, res) => {
  const { submissionId } = req.params;
  const path = `data/submissions/${submissionId}`;

  // Create submission directory if it doesn't exist
  fs.mkdir(path, err => {
    if (err) {
      console.log(err);
    }
  });

  // Upload submission docs
  submissionUpload(req, res, err => {
    if (err) {
      console.log(err);
      return;
    }

    const { filename } = req.files[0];
    res.send(filename);
  });
});

app.delete('/api/upload-submission/:submissionId', (req, res) => {
  const { submissionId } = req.params;
  const filename = req.body;
  fs.unlink(`data/submissions/${submissionId}/${filename}`, err => {
    if (err) {
      console.log(err);
    }
  });
});

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

sequelize.authenticate().then(() => {
  console.log('Connected to database established successfully.');
  app.listen(port, () => {
    console.log(`🚀  Server ready at localhost:${port}${server.graphqlPath}`);
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
    const user = await User.findByPk(result.id);
    return user;
  }
  return null;
};
