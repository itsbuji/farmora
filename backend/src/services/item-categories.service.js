import { ItemCategoryNotFoundError } from '@errors/item-category.errors'
import ItemCategoryModel from '@models/item_categories.models'
import userRoles from '@utils/user-roles'
import { Op } from 'sequelize'

const createItemCategory = async (payload, currentUser) => {
  payload.status = 'active'
  if (currentUser.user_type === userRoles.staff.type) {
    payload.master_id = currentUser.master_id
  } else {
    payload.master_id = currentUser.id
  }

  const newItemCategory = await ItemCategoryModel.create(payload)
  return newItemCategory
}

const getItemCategoryNameOptions = async (currentUser) => {
  const filter = {}
  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const records = await ItemCategoryModel.findAll({
    where: filter,
    attributes: ['id', 'name'],
    limit: 50,
  })
  return records
}

const listItemCategories = async (payload, currentUser) => {
  const { limit, page, ...filter } = payload
  const offset = (page - 1) * limit

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const { count, rows } = await ItemCategoryModel.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
  })

  return {
    page,
    limit,
    total: count,
    data: rows,
  }
}

const getItemCategoryById = async (itemCategoryId, currentUser) => {
  const filter = {
    id: itemCategoryId,
  }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const itemCategoryRecord = await ItemCategoryModel.findOne({
    where: filter,
  })
  if (!itemCategoryRecord) {
    throw new ItemCategoryNotFoundError(itemCategoryId)
  }

  return itemCategoryRecord
}

const updateItemCategory = async (itemCategoryId, payload, currentUser) => {
  const itemCategoryRecord = await getItemCategoryById(itemCategoryId, currentUser)
  await itemCategoryRecord.update(payload)
}

const deleteItemCategory = async (itemCategoryId, currentUser) => {
  const itemCategory = await getItemCategoryById(itemCategoryId, currentUser)
  itemCategory.destroy()
}

const itemCategoryService = {
  createItemCategory,
  listItemCategories,
  getItemCategoryById,
  updateItemCategory,
  deleteItemCategory,
  getItemCategoryNameOptions,
}

export default itemCategoryService
