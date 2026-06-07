import { Router } from 'express'
import { isAuthenticated, isManagerOrAdmin } from '@middlewares/auth.middleware'
import farmController from '@controllers/farm.controller'
import { newFarmSchema, updateFarmSchema } from '@validators/farm.validator'
import validate from '@utils/validate-request'

const router = Router()

router.post(
  '/',
  isAuthenticated,
  validate(newFarmSchema),
  isManagerOrAdmin,
  farmController.create
)
router.get('/', isAuthenticated, isManagerOrAdmin, farmController.getAll)

router.get('/names', isAuthenticated, isManagerOrAdmin, farmController.getNames)

router.get(
  '/:farm_id',
  isAuthenticated,
  isManagerOrAdmin,
  farmController.getById
)
router.put(
  '/:farm_id',
  isAuthenticated,
  validate(updateFarmSchema),
  isManagerOrAdmin,
  farmController.updateById
)
router.delete(
  '/:farm_id',
  isAuthenticated,
  isManagerOrAdmin,
  farmController.deleteById
)

export default router
