'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserResponse;
function UserResponse(userData) {
  // Either create a user from given properties
  // or with fresh properties.
  var user = userData || {};

  // eslint-disable-next-line
  this.id = user._key || user.key || '';

  this.username = user.username || '';
  this.firstName = user.firstName || '';
  this.lastName = user.lastName || '';
  this.email = user.email || '';
  this.cell = user.cell || '';
  this.status = user.status || '';
  this.roles = user.roles || [];
  this.deleted = user.deleted || 0;
  this.created = user.created || '';
  this.updated = user.updated || '';
  this.updatedBy = user.updatedBy || '';
}
//# sourceMappingURL=userResponse.js.map