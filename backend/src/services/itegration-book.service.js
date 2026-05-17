import purchaseService from '@services/purchase.service'
import itemService from '@services/items.service'
import IntegrationBookModel from '@models/integationbook'
import userRoles from '@utils/user-roles'
import { Op } from 'sequelize'
import FarmModel from '@models/farm'

const create = async (payload, currentUser) => {
  if (currentUser.user_type === userRoles.staff.type) {
    payload.master_id = currentUser.master_id
  } else {
    payload.master_id = currentUser.id
  }

  const record = await IntegrationBookModel.create(payload)
  return record
}

const getAll = async (filter, currentUser) => {
  const { farm_id, start_date, end_date } = filter

  const whereClause = {}

  if (farm_id) {
    whereClause.farm_id = farm_id
  }

  if (currentUser.user_type === userRoles.manager.type) {
    whereClause.master_id = currentUser.id
  }

  if (start_date && end_date) {
    whereClause.date = {
      [Op.between]: [start_date, end_date],
    }
  } else if (start_date) {
    whereClause.date = {
      [Op.gte]: start_date,
    }
  } else if (end_date) {
    whereClause.date = {
      [Op.lte]: end_date,
    }
  }

  const item = await itemService.getIntegrationItem(currentUser)
  if (item) {
    filter.category_id = item.id
  }

  const rawPurchases = await purchaseService.getAll(filter, currentUser)

  const purchases = rawPurchases.data.map((purchase) => purchase.toJSON())
  const credit = purchases
    .filter(({ payment_type }) => payment_type === 'credit')
    ?.map((item) => {
      return {
        id: item.id,
        date: item.invoice_date,
        name: `Integration Cost to ${item.batch.name}`,
        net_amount: item.net_amount,
      }
    })

  const rawPaid = await IntegrationBookModel.findAll({
    where: whereClause,
    order: [['date', 'DESC']],
    include: [
      {
        model: FarmModel,
        as: 'farm',
        required: true,
      },
    ],
  })

  const paid = rawPaid.map((paid) => {
    const transformed = paid.toJSON()
    return {
      id: transformed.id,
      net_amount: transformed.amount,
      date: transformed.date,
      name: `Paid to ${transformed.farm.name}`,
    }
  })

  const totalPaid = paid.reduce((acc, curr) => {
    const parsedAmount = parseFloat(curr.net_amount)
    return parsedAmount + acc
  }, 0)

  const totalCredit = credit.reduce((acc, curr) => {
    const parsedAmount = parseFloat(curr.net_amount)
    return parsedAmount + acc
  }, 0)

  return {
    credit,
    paid,
    totals: {
      paid: totalPaid,
      credit: totalCredit,
      balance:   totalCredit - totalPaid,
    },
  }
}

const integrationService = {
  create,
  getAll,
}

export default integrationService
