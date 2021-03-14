import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import BooksController from '../controllers/books.controller';

const booksRouter = Router();
const booksController = new BooksController();

booksRouter.use(ensureAuthenticated);

booksRouter.post(
  '/book',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().not().empty().required(),
      isbn: Joi.string().not().empty().required(),
      category: Joi.string().not().empty().required(),
      edition: Joi.string().not().empty().required(),
      author: Joi.string().not().empty().required(),
      publishing: Joi.string().not().empty().required(),
      editionYear: Joi.number().greater(0).required(),
      numberPages: Joi.number().greater(0).required(),
    },
  }),
  booksController.create,
);

booksRouter.put(
  '/book/:id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().not().empty().required(),
      isbn: Joi.string().not().empty().required(),
      category: Joi.string().not().empty().required(),
      edition: Joi.string().not().empty().required(),
      author: Joi.string().not().empty().required(),
      publishing: Joi.string().not().empty().required(),
      editionYear: Joi.number().greater(0).required(),
      numberPages: Joi.number().greater(0).required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().not().empty().required(),
    },
  }),
  booksController.update,
);

booksRouter.delete(
  '/book/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().not().empty().required(),
    },
  }),
  booksController.remove,
);

booksRouter.get(
  '/book/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().not().empty().required(),
    },
  }),
  booksController.find,
);

booksRouter.get('/', booksController.findAll);

export default booksRouter;
