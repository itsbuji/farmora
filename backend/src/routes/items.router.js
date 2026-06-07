import itemController from '@controllers/items.controller'
import purchaseController from '@controllers/purchase.controller'
import { isAuthenticated, isManagerOrAdmin } from '@middlewares/auth.middleware'
import validate from '@utils/validate-request'
import {
  newItemSchema,
  updateItemsCategory,
  newItemCategory,
  updateItemsSchema,
  assignItemToBatchSchema,
  reassignItemToBatchSchema,
  purchaseBookSchema,
} from '@validators/items.validator'
import { Router } from 'express'

const router = Router()
router.use(isAuthenticated)

// Item
router.get('/categories', itemController.getAll)
router.post('/categories', validate(newItemCategory), itemController.create)

router.get(
  '/categories/names',
  isAuthenticated,
  isManagerOrAdmin,
  itemController.getNames
)

router.get(
  '/categories/names/:vendor_id',
  isAuthenticated,
  isManagerOrAdmin,
  itemController.getItemsByVendorId
)

router.get('/categories/:item_category_id', itemController.getById)
router.put(
  '/categories/:item_category_id',
  validate(updateItemsCategory),
  itemController.updateById
)
router.delete('/categories/:item_category_id', itemController.deleteById)

// Purchase
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

router.post(
  '/purchase-book',
  isAuthenticated,
  validate(purchaseBookSchema),
  purchaseController.createPurchaseBookEntry
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
