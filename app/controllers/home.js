const pkginfo = require('../../package.json');
const spec = require('../spec');

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Public
 *     summary: Show Module API information.
 *     operationId: showApiInfo
 *     responses:
 *       200:
 *         description: Describe general API information
 */
const welcome = (ctx) => {
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author,
  };

  ctx.res.ok(data, 'Benchmarking System - Users API.');
};

const showSwaggerSpec = (ctx) => {
  ctx.body = spec;
};

module.exports = {
  welcome,
  showSwaggerSpec,
};
