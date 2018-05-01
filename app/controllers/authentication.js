import { Database, aql } from 'arangojs';

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
// export default async function populateAssessment(ctx, next) {
const userLogin = async (ctx, next) => {
  const db = new Database();

  try {
    // TODO - complete the logic of this function...
    const now = Date.now();
    const cursor = await db.query(aql` RETURN ${now}`);
    const result = await cursor.next();
    ctx.res.ok('Successfully logged in: ', result);
    return next();
  } catch (err) {
    console.log('An error occorred! ', err);
    return next();
  }
};

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
const userLogout = (ctx) => {
  // TODO - complete the logic of this function...

  ctx.res.ok('Successfully logged out.');
};

module.exports = {
  userLogin,
  userLogout,
};
