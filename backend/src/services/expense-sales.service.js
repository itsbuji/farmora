import ExpenseSalesModel from '@models/expensesales'
import SeasonModel from '@models/season'
import userRoles from '@utils/user-roles'
import dayjs from 'dayjs'
import { Op } from 'sequelize'

const createExpenseSale = async (payload, currentUser) => {

  if (currentUser.user_type === userRoles.staff.type) {
    payload.master_id = currentUser.master_id
  } else {
    payload.master_id = currentUser.id
  }

  const record = await ExpenseSalesModel.create(payload)
  return record
}

const listExpenseSales = async (filter, currentUser) => {
  const { season_id, start_date, end_date, purpose } = filter
  const whereClause = {}

  if (season_id) {
    whereClause.season_id = season_id
  }

  if (purpose) {
    whereClause.purpose = {
      [Op.like]: `%${purpose}%`,
    }
  }

  if (start_date && end_date) {
    whereClause.date = {
      [Op.between]: [dayjs(start_date).toDate(), dayjs(end_date).toDate()],
    }
  } else if (start_date) {
    whereClause.date = { [Op.gte]: dayjs(start_date).toDate() }
  } else if (end_date) {
    whereClause.date = { [Op.lte]: dayjs(end_date).toDate() }
  }

  if (currentUser.user_type === userRoles.staff.type) {
    whereClause.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    whereClause.master_id = currentUser.id
  }

  const expenseSales = await ExpenseSalesModel.findAll({
    where: whereClause,
    order: [['date', 'DESC']],
    include: [{ model: SeasonModel, as: 'season', required: false }],
  })

  return expenseSales
}

const getExpenseSaleById = async (id, currentUser) => {
  const whereClause = { id }

  if (currentUser.user_type === userRoles.staff.type) {
    whereClause.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    whereClause.master_id = currentUser.id
  }

  const record = await ExpenseSalesModel.findOne({
    where: whereClause,
  })

  if (!record) {
    throw new Error('Expense sales record not found')
  }

  return record
}

const updateExpenseSale = async (id, payload, currentUser) => {
  const record = await getExpenseSaleById(id, currentUser)
  await record.update(payload)
}

const deleteExpenseSale = async (id, currentUser) => {
  const record = await getExpenseSaleById(id, currentUser)
  await record.destroy()
}

const expenseSalesService = {
  createExpenseSale,
  listExpenseSales,
  getExpenseSaleById,
  updateExpenseSale,
  deleteExpenseSale,
}

export default expenseSalesService
