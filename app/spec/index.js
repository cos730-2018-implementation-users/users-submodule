const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const pkginfo = require('../../package.json');


// Options for the swagger specification
const options = {
  // Import the swagger definitions
  swaggerDefinition: {
    info: {
      title: pkginfo.name,
      description: 'This definition describes all the resources available on the User Subsystem, and the HTTP methods applicable on each. It also provides definitions and descriptions for authentication and authorisation routes.',
      version: pkginfo.version,
      contact: pkginfo.author,
    },
    host: 'cos730.mjshika.xyz',
    basePath: '/api/v0.0.1/',
    schemes: [
      'https',
      'http',
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      Authorization: {
        in: 'header',
        type: 'apiKey',
        name: 'Authorization',
        description: 'The credentials to authenticate a user',
      },
    },
    externalDocs: {
      description: 'COS 730 Website',
      url: 'http://cs.up.ac.za/courses/COS730',
    },
  },
  // Path to the API specs
  apis: [
    path.join(__dirname, '../controllers/**/*.js'),
    path.join(__dirname, './definitions.yaml'),
    path.join(__dirname, './parameters.yaml'),
    path.join(__dirname, './responses.yaml'),
    path.join(__dirname, './tags.yaml'),
  ],
};
const spec = swaggerJSDoc(options);

module.exports = spec;
