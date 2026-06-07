import SubscriptionModel from '@models/subscription'
import PackageModel from '@models/package'
import UserModel from '@models/user'
import paymentService from '@services/payment.service'
import { SubsriptionAlreadyActiveError } from '@errors/subscription.errors'
import { PackageNotFoundError } from '@errors/package.errors'
import dayjs from 'dayjs'
import logger from '@utils/logger'

const createSubscription = async (userID, packageID) => {
  const subscriptionRecord = await SubscriptionModel.findOne({
    where: { user_id: userID },
  })

  if (subscriptionRecord) {
    throw new SubsriptionAlreadyActiveError(userID)
  }

  const packageRecord = await PackageModel.findByPk(packageID)
  if (!packageRecord) {
    throw new PackageNotFoundError(packageID)
  }

  const validFrom = new dayjs().toDate()
  const validTo = new dayjs().add(packageRecord.duration, 'month').toDate()

  logger.info({ userID, packageID }, 'Creating subscription')
  const newSubscription = await SubscriptionModel.create({
    user_id: userID,
    package_id: packageID,
    valid_from: validFrom,
    valid_to: validTo,
    status: 'active',
  })
  logger.info({ subscription_id: newSubscription.id }, 'Subscription created')

  await paymentService.processPayment(
    userID,
    newSubscription.id,
    'card',
    packageRecord.price
  )

  return newSubscription
}

const listSubscriptions = async (payload) => {
  const { page, limit } = payload
  const offset = (page - 1) * limit

  logger.debug({ payload }, 'Fetching subscriptions: raw query payload')

  const { count, rows } = await SubscriptionModel.findAndCountAll({
    limit,
    offset,
    order: [['id', 'DESC']],
    attributes: {
      exclude: ['user_id', 'package_id'],
    },
    include: [
      {
        model: UserModel,
        as: 'user',
        required: false,
        attributes: ['id', 'name', 'username'],
      },
      {
        model: PackageModel,
        as: 'package',
        required: false,
        attributes: ['id', 'name', 'price', 'duration'],
      },
    ],
  })

  logger.info({ page, limit, count }, 'Subscriptions fetched')

  return {
    page,
    limit,
    total: count,
    data: rows,
  }
}

const subscriptionService = {
  createSubscription,
  listSubscriptions,
}

export default subscriptionService
