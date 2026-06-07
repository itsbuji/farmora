import permissionRoleService from '@services/permission-role.service'
import asyncHandler from '@utils/async-handler'

const getAllPermissions = async (req, res) => {
  const permissions = await permissionRoleService.listPermissionRoles()
  res.success(permissions, { message: 'permissions list' })
}

const permissionController = {
  getAllPermissions: asyncHandler(getAllPermissions),
}

export default permissionController
