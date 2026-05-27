import Joi from 'joi'

export const newExpenseSalesSchema = Joi.object({
  season_id: Joi.number().required(),
  purpose: Joi.string().required(),
  amount: Joi.number().required(),
  date: Joi.string().required(),
  narration: Joi.string().optional().allow('', null),
})

export const updateExpenseSalesSchema = newExpenseSalesSchema.fork(
  Object.keys(newExpenseSalesSchema.describe().keys),
  (s) => s.optional()
)
