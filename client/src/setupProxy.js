const proxy = require('http-proxy-middleware');

module.exports = app => {
  // app.use(proxy / ('/', { target: 'http://localhost:4000/' }));
  app.use(proxy('/graphql', { target: 'http://localhost:4000/graphql' }));
  app.use(proxy('/api', { target: 'http://localhost:4000/' }));
  app.use(proxy('/voyager', { target: 'http://localhost:4000/voyager' }));
};
