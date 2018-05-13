import atob from 'atob';
import { login } from '../services/authentication';

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

    const response = await login(ctx.db, username, password);

    ctx.res.ok(response.data, 'Successfully logged in: ');
    return next();
  } catch (err) {
    if (err.code === 401) {
      ctx.res.unauthorized(err.message, err.data);
      return next();
    } else if (err.code === 403) {
      ctx.res.forbidden(err.message, err.data);
      return next();
    }

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
