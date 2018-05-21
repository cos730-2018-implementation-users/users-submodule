export default function PermissionResponse(permissionData) {
  const permission = permissionData || {};

  // eslint-disable-next-line
  this.id = permission._key || permission.key || '';

  this.key = permission.key || '';
  this.name = permission.name || '';
  this.description = permission.description || '';
  this.deleted = permission.deleted || 0;
  this.created = permission.created || '';
  this.updated = permission.updated || '';
  this.updatedBy = permission.updatedBy || '';
}
