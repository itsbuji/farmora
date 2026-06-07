import purchaseController from '@controllers/purchase.controller'
import { isAuthenticated } from '@middlewares/auth.middleware'
import validate from '@utils/validate-request'
import {
  newItemSchema,
  updateItemsSchema,
  assignItemToBatchSchema,
  reassignItemToBatchSchema,
} from '@validators/items.validator'

import { Router } from 'express'

const router = Router()
router.use(isAuthenticated)

router.post(
  '/',
  isAuthenticated,
  validate(newItemSchema),
  purchaseController.create
)
router.get('/', isAuthenticated, purchaseController.getAll)
router.get(
  '/purchase-book',
  isAuthenticated,
  purchaseController.getPurchaseBook
)

router.get('/:item_id', isAuthenticated, purchaseController.getById)

router.put(
  '/item-batch-assign',
  validate(assignItemToBatchSchema),
  isAuthenticated,
  purchaseController.assignItemToBatch
)
router.put(
  '/item-batch-reassign',
  validate(reassignItemToBatchSchema),
  isAuthenticated,
  purchaseController.reassignItemToBatch
)

router.put(
  '/:item_id',
  isAuthenticated,
  validate(updateItemsSchema),
  purchaseController.updateById
)

router.delete('/:item_id', isAuthenticated, purchaseController.deleteById)

export default router
