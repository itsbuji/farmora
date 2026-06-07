import workingCostService from '@services/working-cost.service'
import asyncHandler from '@utils/async-handler'

const create = async (req, res) => {
  const payload = req.body
  const user = req.user

  const newRecord = await workingCostService.createWorkingCost(payload, user)
  res.success(newRecord, {
    message: 'Working cost record created successfully',
  })
}

const getAll = async (req, res) => {
  const filter = {}
  const user = req.user

  if (req.query.season_id) {
    filter.season_id = req.query.season_id
  }
  if (req.query.start_date) {
    filter.start_date = req.query.start_date
  }
  if (req.query.end_date) {
    filter.end_date = req.query.end_date
  }

  const records = await workingCostService.getWorkingCosts(filter, user)
  res.success(records, {
    message: 'Working cost records retrieved successfully',
  })
}

const workingCostController = {
  create: asyncHandler(create),
  getAll: asyncHandler(getAll),
}

export default workingCostController
