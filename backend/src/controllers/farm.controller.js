import farmService from '@services/farm.service'
import asyncHandler from '@utils/async-handler'

const create = async (req, res) => {
  const newFarm = await farmService.createFarm(req.body, req.user)
  res.success(newFarm, {
    message: 'Farm created successfully',
    statusCode: 201,
  })
}

const getNames = async (req, res) => {
  const records = await farmService.getFarmNameOptions(req.user)
  res.success(records, { message: 'farm names' })
}

const getAll = async (req, res) => {
  const filter = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
  }
  if (req.query.status) filter.status = req.query.status
  if (req.query.name) filter.name = req.query.name
  if (req.query.master_id) filter.master_id = req.query.master_id
  const farmRecords = await farmService.listFarms(filter, req.user)
  res.success(farmRecords, { message: 'Farms fetched successfully' })
}

const getById = async (req, res) => {
  const { farm_id } = req.params
  const farmRecord = await farmService.getFarmById(farm_id, req.user)
  res.success(farmRecord, { message: 'Farm details fetched successfully' })
}

const updateById = async (req, res) => {
  const { farm_id } = req.params
  await farmService.updateFarm(farm_id, req.body, req.body)
  res.success(null, { message: 'Farm updated successfully' })
}

const deleteById = async (req, res) => {
  const { farm_id } = req.params
  await farmService.deleteFarm(farm_id, req.user)
  res.success(null, { message: 'Farm deleted successfully' })
}

const farmController = {
  create: asyncHandler(create),
  getAll: asyncHandler(getAll),
  getById: asyncHandler(getById),
  updateById: asyncHandler(updateById),
  deleteById: asyncHandler(deleteById),
  getNames: asyncHandler(getNames),
}

export default farmController
