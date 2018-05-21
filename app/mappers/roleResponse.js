import lodash from 'lodash';
import PermissionResponse from './permissionResponse';

const mapPermissions = (userPermissions, dbPermissions) => {
  const result = [];
  if (userPermissions && userPermissions.length > 0) {
    for (let i = 0; i < userPermissions.length; i += 1) {
      const roleIndex = lodash.findIndex(dbPermissions, ['key', userPermissions[i]]);
      if (roleIndex !== -1) {
        result.push(new PermissionResponse(dbPermissions[roleIndex]));
      }
    }
    return result;
  }

  return [];
};

export default function RoleResponse(roleData, dbPermissions) {
  const role = roleData || {};

  // eslint-disable-next-line
  this.id = role._key || role.key || '';

  this.key = role.key || '';
  this.name = role.name || '';
  this.description = role.description || '';
  this.permissions = mapPermissions(role.permissions, dbPermissions);
  this.deleted = role.deleted || 0;
  this.created = role.created || '';
  this.updated = role.updated || '';
  this.updatedBy = role.updatedBy || '';
}
