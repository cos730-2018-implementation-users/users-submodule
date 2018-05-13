import { Database, aql } from 'arangojs';
import bcrypt from 'bcryptjs';
import UserResponse from '../mappers/userResponse';


const db = new Database({
  // url: 'http://localhost:8529',
  url: 'http://cos.mjshika.xyz/db/users',
});
db.useBasicAuth('root', 'mysecretpassword');

/**
* Attemps to log a user into the system.
*/
export async function login(username, password) {
  try {
    const cursor = await db.query(aql`
      FOR u IN Users
      FILTER u.email == ${username}
      RETURN u
      `);

    const user = await cursor.next();
    if (!user) {
      const errorResponse = {
        code: 401,
        message: 'Invalid username and/or password.',
        data: {},
      };
      return Promise.reject(errorResponse);
    }

    if (user.status !== 'active') {
      const errorResponse = {
        code: 403,
        message: 'Your account is not active. Please contact support.',
        data: {},
      };
      return Promise.reject(errorResponse);
    }

    const response = {
      result: bcrypt.compareSync(password, user.password),
      data: new UserResponse(user),
    };

    if (!response.result) {
      const errorResponse = {
        code: 401,
        message: 'Invalid username and/or password.',
        data: {},
      };
      return Promise.reject(errorResponse);
    }

    return Promise.resolve(response);
  } catch (err) {
    const errorResponse = {
      code: 500,
      message: 'Internal server error occurred.',
      data: err,
    };
    return Promise.reject(errorResponse);
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
export async function logout(ctx, next) {
  // TODO - complete the logic of this function...

  ctx.res.ok('Successfully logged out.');
}
