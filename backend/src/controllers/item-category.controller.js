import itemCategoryService from '@services/item-categories.service'
import asyncHandler from '@utils/async-handler'

const create = async (req, res) => {
  const newItemCategory = await itemCategoryService.createItemCategory(req.body, req.user)
  res.success(newItemCategory, {
    message: 'Item category created',
    statusCode: 201,
  })
}

const getNames = async (req, res) => {
  const records = await itemCategoryService.getItemCategoryNameOptions(req.user)
  res.success(records, { message: 'item category names' })
}

const getById = async (req, res) => {
  const { item_category_id } = req.params
  const itemCategoryRecord = await itemCategoryService.getItemCategoryById(
    item_category_id,
    req.user
  )
  res.success(itemCategoryRecord, { message: 'Item category retreived' })
}

const getAll = async (req, res) => {
  const filter = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
  }

  if (req.query.master_id) {
    filter.master_id = req.query.master_id
  }

  if (req.query.status) {
    filter.status = req.query.status
  }

  if (req.query.name) {
    filter.name = req.query.name
  }

  const itemCategoryRecords = await itemCategoryService.listItemCategories(filter, req.user)
  res.success(itemCategoryRecords, {
    message: 'Item categories fetched successfully',
  })
}

const updateById = async (req, res) => {
  const { item_category_id } = req.params
  const payload = req.body

  await itemCategoryService.updateItemCategory(item_category_id, payload, req.user)
  res.success(null, { message: 'Vendor updated successfully' })
}

const deleteById = async (req, res) => {
  const { item_category_id } = req.params
  await itemCategoryService.deleteItemCategory(item_category_id, req.user)
  res.success(null, { message: 'Vendor deleted successfully', statusCode: 204 })
}

const itemCategoryController = {
  create: asyncHandler(create),
  getById: asyncHandler(getById),
  getAll: asyncHandler(getAll),
  updateById: asyncHandler(updateById),
  deleteById: asyncHandler(deleteById),
  getNames: asyncHandler(getNames),
}

export default itemCategoryController
