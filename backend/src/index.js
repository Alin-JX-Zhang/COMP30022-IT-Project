const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const usersRoutes = require('./routes/users');

const connectionsRoutes = require('./routes/connections');

const eventsRoutes = require('./routes/events');

const tasksRoutes = require('./routes/tasks');

const accountsRoutes = require('./routes/accounts');

const profilesRoutes = require('./routes/profiles');

const notesRoutes = require('./routes/notes');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Folkus',
      description:
        'Folkus web app',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/connections',
  passport.authenticate('jwt', { session: false }),
  connectionsRoutes,
);

app.use(
  '/api/events',
  passport.authenticate('jwt', { session: false }),
  eventsRoutes,
);

app.use(
  '/api/tasks',
  passport.authenticate('jwt', { session: false }),
  tasksRoutes,
);

app.use(
  '/api/accounts',
  passport.authenticate('jwt', { session: false }),
  accountsRoutes,
);

app.use(
  '/api/profiles',
  passport.authenticate('jwt', { session: false }),
  profilesRoutes,
);

app.use(
  '/api/notes',
  passport.authenticate('jwt', { session: false }),
  notesRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
