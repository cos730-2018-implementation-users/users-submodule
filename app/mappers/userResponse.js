import lodash from 'lodash';
import RoleResponse from './roleResponse';

const mapRoles = (userRoles, dbRoles, dbPermissions) => {
  const result = [];
  if (userRoles && userRoles.length > 0) {
    for (let i = 0; i < userRoles.length; i += 1) {
      const roleIndex = lodash.findIndex(dbRoles, ['key', userRoles[i]]);
      if (roleIndex !== -1) {
        result.push(new RoleResponse(dbRoles[roleIndex], dbPermissions));
      }
    }
    return result;
  }

  return [];
};

export default function UserResponse(userData, dbRoles, dbPermissions) {
  // Either create a user from given properties
  // or with fresh properties.
  const user = userData || {};

  // eslint-disable-next-line
  this.id = user._key || user.key || '';

  this.username = user.username || '';
  this.firstName = user.firstName || '';
  this.lastName = user.lastName || '';
  this.email = user.email || '';
  this.cell = user.cell || '';
  this.status = user.status || '';
  this.roles = mapRoles(user.roles, dbRoles, dbPermissions);
  this.deleted = user.deleted || 0;
  this.created = user.created || '';
  this.updated = user.updated || '';
  this.updatedBy = user.updatedBy || '';
}
