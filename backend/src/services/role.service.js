import RoleModel from '@models/role'
import { PermissionDeniedError } from '@errors/auth.errors'
import { sequelize } from '@utils/db'
import { Op, UniqueConstraintError } from 'sequelize'
import { RoleAlreadyExistsError, RoleNotFoundError } from '@errors/role.errors'
import RolePermissionModel from '@models/rolepermission'
import userRoles from '@utils/user-roles'
import PermissionModel from '@models/permission'

const createRole = async (payload, currentUser) => {
  console.log('Creating role with payload:', payload, 'for user:', currentUser)
  if (currentUser.user_type === userRoles.staff.type) {
    throw new PermissionDeniedError('Only managers and admins can create roles')
  }

  const transaction = await sequelize.transaction()
  try {
    const newRole = await RoleModel.create(
      {
        manager_id: currentUser.id,
        name: payload.name,
        description: payload.description,
      },
      {
        underscored: true,
        paranoid: true,
        timestamps: true,
        transaction,
      }
    )

    const permissionIds = payload.permission_ids || []

    await RolePermissionModel.bulkCreate(
      permissionIds.map((permissionId) => ({
        role_id: newRole.id,
        permission_id: permissionId,
      })),
      { transaction }
    )

    await transaction.commit()
    return newRole
  } catch (error) {
    await transaction.rollback()
    console.log('Error creating role:', error)
    throw error
  }
}

const listRoles = async (payload, currentUser) => {
  const { limit, page, ...filter } = payload
  const offset = (page - 1) * limit

  if (currentUser.user_type === userRoles.manager.type) {
    filter.manager_id = currentUser.id
  }

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }

  const { count, rows } = await RoleModel.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
    include: [
      {
        model: RolePermissionModel,
        as: 'role_permissions',
        required: false,
      },
    ],
    attributes: {
      exclude: ['password'],
    },
  })

  return {
    page,
    limit,
    total: count,
    data: rows,
  }
}

const getRoleById = async (roleId, currentUser) => {
  const { user_type, id } = currentUser || {}
  const filter = { id: roleId }

  if (user_type === userRoles.manager.type) {
    filter.manager_id = id
  }

  const roleRecord = await RoleModel.findOne({
    where: filter,
    include: [
      {
        model: RolePermissionModel,
        as: 'role_permissions',
        required: false,
        attributes: ['permission_id'],
      },
    ],
  })

  if (!roleRecord) {
    throw new RoleNotFoundError(roleId)
  }

  const permissionIds = (roleRecord.role_permissions || [])
    .map((rp) => rp.permission_id)
    .filter(Boolean)

  const permissions =
    permissionIds.length > 0
      ? await PermissionModel.findAll({
          where: { id: { [Op.in]: permissionIds } },
          attributes: ['id', 'key', 'description'],
        })
      : []

  roleRecord.dataValues.permissions = permissions
  delete roleRecord.dataValues.role_permissions

  return roleRecord
}

const updateRole = async (roleId, payload, currentUser) => {
  const roleRecord = await getRoleById(roleId, currentUser)
  const transaction = await sequelize.transaction()
  try {
    await roleRecord.update(payload, { transaction })
    RolePermissionModel.destroy({
      where: { role_id: roleId },
      transaction,
    })
    const permissionIds = payload.permission_ids || []
    const rolePermissions = permissionIds.map((permissionId) => ({
      role_id: roleId,
      permission_id: permissionId,
    }))
    await RolePermissionModel.bulkCreate(rolePermissions, { transaction })
    await transaction.commit()
    return null
  } catch (error) {
    await transaction.rollback()
    if (error instanceof UniqueConstraintError) {
      throw new RoleAlreadyExistsError(payload.name)
    }
    throw error
  }
}

const deleteRole = async (roleId, currentUser) => {
  const roleRecord = await getRoleById(roleId, currentUser)
  RolePermissionModel.destroy({
    where: { role_id: roleId },
  })
  await roleRecord.destroy()
}

const roleService = {
  createRole,
  listRoles,
  getRoleById,
  updateRole,
  deleteRole,
}

export default roleService
