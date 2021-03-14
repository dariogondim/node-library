import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      age: Joi.number().greater(0).required(),
      old_password: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

profileRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
    },
  }),
  profileController.remove,
);

export default profileRouter;
