const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const accidentRoute = require('./accident.route');
const handbookRoute = require('./handbook.router');
const accidentTypeRoute = require('./accidentType.route');
const helperRoute = require('./helper.route')
const config = require('../../config/config');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/accidents',
    route: accidentRoute,
  },
  {
    path: '/helpers',
    route: helperRoute,
  },
  {
    path: '/handbooks',
    route: handbookRoute,
  },
  {
    path: '/accidentsType',
    route: accidentTypeRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
