import generalExpenseService from '@services/general-expense.service'
import asyncHandler from '@utils/async-handler'

const create = async (req, res) => {
  const payload = req.body
  const user = req.user

  const newRecord = await generalExpenseService.createGeneralExpense(payload, user)
  res.success(newRecord, {
    message: 'General expense record created successfully',
  })
}

const getAll = async (req, res) => {
  const filter = {}
  const user = req.user

  if (req.query.season_id) {
    filter.season_id = req.query.season_id
  }

  if (req.query.purpose) {
    filter.purpose = req.query.purpose
  }

  if (req.query.start_date) {
    filter.start_date = req.query.start_date
  }
  if (req.query.end_date) {
    filter.end_date = req.query.end_date
  }

  const records = await generalExpenseService.listGeneralExpenses(filter, user)
  res.success(records, {
    message: 'General expense records retrieved successfully',
  })
}

const getById = async (req, res) => {
  const { id } = req.params
  const user = req.user

  const record = await generalExpenseService.getGeneralExpenseById(id, user)
  res.success(record, {
    message: 'General expense record retrieved successfully',
  })
}

const updateById = async (req, res) => {
  const { id } = req.params
  const payload = req.body
  const user = req.user

  await generalExpenseService.updateGeneralExpense(id, payload, user)
  res.success(null, {
    message: 'General expense record updated successfully',
  })
}

const deleteById = async (req, res) => {
  const { id } = req.params
  const user = req.user

  await generalExpenseService.deleteGeneralExpense(id, user)
  res.success(null, {
    message: 'General expense record deleted successfully',
    statusCode: 204,
  })
}

const generalExpenseController = {
  create: asyncHandler(create),
  getAll: asyncHandler(getAll),
  getById: asyncHandler(getById),
  updateById: asyncHandler(updateById),
  deleteById: asyncHandler(deleteById),
}

export default generalExpenseController
