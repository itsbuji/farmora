import { ItemAssignmentNotFoundError } from '@errors/item.errors'
import ItemBatchAssignmentModel from '@models/itembatchassignment'
import logger from '@utils/logger'

const createItemBatchAssignment = async (payload) => {
  logger.debug({ payload }, 'Assigning item to batch: raw input')
  const newRecord = await ItemBatchAssignmentModel.create(payload)
  logger.debug({ item: newRecord }, 'Assigned item to batch: raw response')

  logger.info(
    {
      item_assignment_id: newRecord.id,
      ...payload,
    },
    'Assigned item to batch'
  )

  return newRecord
}

const getAssignmentByBatchAndItem = async (batchId, itemId) => {
  logger.debug({ batchId, itemId }, 'Getting assignment by batch and item')
  const record = await ItemBatchAssignmentModel.findOne({
    where: {
      purchase_id: itemId,
      batch_id: batchId,
    },
  })
  if (!record) {
    logger.debug({ batchId, itemId }, 'Assignment not found for batch and item')
    return null
  }

  logger.info({ assignment: record }, 'Assignment found')
  return record
}

const updateItemBatchAssignment = async (payload) => {
  const { item_id, batch_id, quantity } = payload
  logger.debug({ payload }, 'Updating assignment quantity')
  const record = await getAssignmentByBatchAndItem(batch_id, item_id)
  if (!record) {
    throw new ItemAssignmentNotFoundError(batch_id, item_id)
  }
  const updatedRecord = await record.update({
    quantity,
  })

  logger.info({ updated: updatedRecord }, 'Updated assignment quantity')
  return updatedRecord
}

const itemBatchAssignmentService = {
  createItemBatchAssignment,
  getAssignmentByBatchAndItem,
  updateItemBatchAssignment,
}

export default itemBatchAssignmentService
