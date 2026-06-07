import PermissionModel from '@models/permission'

const listPermissionRoles = async () => {
  try {
    const permissionRecords = await PermissionModel.findAll({})
    return permissionRecords
  } catch (error) {
    console.error('Error fetching permission roles:', error)
    throw error
  }
}

const permissionRoleService = {
  listPermissionRoles,
}

export default permissionRoleService
