import Joi from 'joi';

export const taskValidation = {
  create: Joi.object({
    title: Joi.string().required().min(3),
    description: Joi.string().optional(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending')
  }),

  update: Joi.object({
    title: Joi.string().min(3),
    description: Joi.string(),
    status: Joi.string().valid('pending', 'in-progress', 'completed')
  }).min(1),

  query: Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(100),
    status: Joi.string().valid('pending', 'in-progress', 'completed'),
    sortBy: Joi.string().pattern(/^[a-zA-Z]+:(asc|desc)$/),
    search: Joi.string().min(1)
  })
};