import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
      age: Joi.number().greater(0).required(),
    },
  }),
  usersController.create,
);

usersRouter.get('/', usersController.findAll);

export default usersRouter;
