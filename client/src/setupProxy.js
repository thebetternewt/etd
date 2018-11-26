const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/api', { target: 'http://localhost:4000/' }));
  app.use(proxy('/voyager', { target: 'http://localhost:4000/voyager' }));
  app.use(
    proxy('/subscriptions', { target: 'ws://localhost:4000/graphql', ws: true })
  );
};
