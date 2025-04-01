import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        res.status(400).json({
          error: error.details.map((detail) => detail.message)
        });
        return;
      }
      next(error);
    }
  };
};