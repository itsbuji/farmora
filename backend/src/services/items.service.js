import { ItemCategoryNotFoundError } from '@errors/item-category.errors'
import VendorModel from '@models/vendor'
import ItemModel from '@models/items.model'
import userRoles from '@utils/user-roles'
import { Op } from 'sequelize'

const createItem = async (payload, currentUser) => {
  payload.status = 'active'
  if (currentUser.user_type === userRoles.staff.type) {
    payload.master_id = currentUser.master_id
  } else {
    payload.master_id = currentUser.id
  }

  const newRecord = await ItemModel.create(payload)
  return newRecord
}

const getItemNameOptions = async (currentUser) => {
  const filter = {}
  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const records = await ItemModel.findAll({
    where: filter,
    attributes: ['id', 'name', 'type'],
    limit: 50,
  })
  return records
}

const listItemsByVendor = async (vendorID, currentUser) => {
  const filter = {
    vendor_id: vendorID,
  }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const record = await ItemModel.findAll({
    where: filter,
    attributes: ['id', 'name', 'base_price', 'type'],
    limit: 50,
  })

  return record
}

const listItems = async (payload, currentUser) => {
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

  const { count, rows } = await ItemModel.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
    include: [{ model: VendorModel, as: 'vendor', required: true }],
  })

  return {
    page,
    limit,
    total: count,
    data: rows,
  }
}

const getItemById = async (itemCategoryId, currentUser) => {
  const filter = {
    id: itemCategoryId,
  }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const record = await ItemModel.findOne({
    where: filter,
  })
  if (!record) {
    throw new ItemCategoryNotFoundError(itemCategoryId)
  }

  return record
}

const updateItem = async (itemCategoryId, payload, currentUser) => {
  const itemCategoryRecord = await getItemById(itemCategoryId, currentUser)
  await itemCategoryRecord.update(payload)
}

const deleteItem = async (itemCategoryId, currentUser) => {
  const itemCategory = await getItemById(itemCategoryId, currentUser)
  itemCategory.destroy()
}

const getIntegrationItem = async (currentUser) => {
  const filter = {
    type: 'integration',
  }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else {
    filter.master_id = currentUser.id
  }

  const itemCategoryRecord = await ItemModel.findOne({
    where: filter,
  })

  return itemCategoryRecord.toJSON()
}

const getWorkingItem = async (currentUser) => {
  const filter = {
    type: 'working',
  }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else {
    filter.master_id = currentUser.id
  }

  const itemCategoryRecord = await ItemModel.findOne({
    where: filter,
  })

  return itemCategoryRecord.toJSON()
}

const itemService = {
  createItem,
  listItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemNameOptions,
  listItemsByVendor,
  getIntegrationItem,
  getWorkingItem,
}

export default itemService
