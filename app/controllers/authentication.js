import atob from 'atob';
import jwt from 'jsonwebtoken';
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
    const userObj = JSON.parse(JSON.stringify(response.data));

    ctx.status = ctx.res.statusCodes.OK;
    ctx.body = {
      jwt: jwt.sign(userObj, ctx.jwtSecret),
    };


    return ctx;

    // return next();
  } catch (err) {
    console.log('ERRR: ', err);
    if (err.code === 401) {
      ctx.res.unauthorized(err.message, err.data);
      return next();
    } else if (err.code === 403) {
      ctx.res.forbidden(err.message, err.data);
      return next();
    }

    ctx.res.internalServerError(500, 'Oops, something went wrong.', {});
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

  ctx.res.noContent({}, 'Successfully logged out.');
  return next();
}
