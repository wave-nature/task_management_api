import express from 'express';
import * as taskController from '../controllers/task.controller';
import { auth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate';
import { taskValidation } from '../validations/task.validation';

const router = express.Router();

router.use(auth);

router.post('/', validate(taskValidation.create), taskController.createTask);
router.get('/', validate(taskValidation.query), taskController.getTasks);
router.patch('/:id', validate(taskValidation.update), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;