import { aql } from 'arangojs';
import bcrypt from 'bcryptjs';
import UserResponse from '../mappers/userResponse';

/**
* Attemps to log a user into the system.
*/
export async function login(db, username, password) {
  try {
    db.useDatabase('Users');
    const cursor = await db.query(aql`FOR u IN UserDetails FILTER u.email == ${username} or u.username == ${username} RETURN u`);

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

    // Get the roles...
    const rolesCursor = await db.query(aql`FOR doc IN Roles RETURN doc`);
    const dbRoles = await rolesCursor.all();

    // Get the permissions...
    const permissionsCursor = await db.query(aql`FOR doc IN Permissions RETURN doc`);
    const dbPermissions = await permissionsCursor.all();

    const userData = await new UserResponse(user, dbRoles, dbPermissions);
    const response = {
      result: bcrypt.compareSync(password, user.password),
      data: userData,
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
  return next();
}
