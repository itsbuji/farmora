import subscriptionService from '@services/subscription.service'
import asyncHandler from '@utils/async-handler'
import logger from '@utils/logger'

const create = async (req, res) => {
  const { package_id } = req.body
  const userID = req.user.id

  logger.info({ package_id, userID }, 'Create subscription request received')
  const newSubscription = await subscriptionService.createSubscription(userID, package_id)

  res.success(newSubscription, {
    message: 'Subscription created successfully',
    statusCode: 201,
  })
}

const getAll = async (req, res) => {
  const filter = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
  }

  const subscriptionRecords = await subscriptionService.listSubscriptions(filter)
  res.success(subscriptionRecords, {
    message: 'Subscriptions fetched successfully',
  })
}

const subscriptionController = {
  create: asyncHandler(create),
  getAll: asyncHandler(getAll),
}

export default subscriptionController
