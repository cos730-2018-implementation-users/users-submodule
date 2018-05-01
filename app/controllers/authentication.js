import { Database, aql } from 'arangojs';

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
    // TODO - complete the logic of this function...
    const now = Date.now();
    const cursor = await db.query(aql` RETURN ${now}`);
    const result = await cursor.next();
    ctx.res.ok('Successfully logged in: ', result);
    return next();
  } catch (err) {
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
