import { Database, aql } from 'arangojs';
import atob from 'atob';
import bcrypt from 'bcryptjs';
import { login } from '../services/authentication';

const db = new Database({
  url: 'http://localhost:8529',
});
db.useBasicAuth('root', 'mysecretpassword');

/**
 * @swagger
 * /user/login:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Logs user into the system.
 *     operationId: userLogin
 *     parameters:
 *       - $ref: '#/parameters/basic_authorization'
 *     responses:
 *       200:
 *         description: Successfully logged-in
 *         schema:
 *           $ref: '#/definitions/AuthenticationResponse'
 *         headers:
 *           X-Expires-After:
 *             type: string
 *             format: date-time
 *             description: 'date in UTC when token expires'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       500:
 *         $ref: '#/responses/InternalServerError'
 */
export async function userLogin(ctx, next) {
  try {
    // console.log('CONTEXT RES: ', ctx.res);
    if (!ctx.request.header.authorization) {
      ctx.res.unauthorized('Authorization required.', {});
      return next();
    }

    const authorisation = ctx.request.header.authorization;
    if (!authorisation.includes('Basic')) {
      ctx.res.unauthorized('Basic authentication required.', {});
      return next();
    }

    const credentials = atob(authorisation.split(' ')[1]).split(':');
    const username = credentials[0];
    const password = credentials[1];

    const response = await login(username, password);

    ctx.res.ok('Successfully logged in: ', response.data);
    return next();
  } catch (err) {
    console.log('ERROR: ', err);
    ctx.res.internal_server_error('Oops, something went wrong.');
    return next();
  }
}

/**
 * @swagger
 * /user/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Logs out current logged in user session.
 *     parameters:
 *       - $ref: '#/parameters/bearer_authorization'
 *     operationId: userLogout
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContent'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       500:
 *         $ref: '#/responses/InternalServerError'
 */
export async function userLogout(ctx, next) {
  // TODO - complete the logic of this function...

  ctx.res.ok('Successfully logged out.');
}
