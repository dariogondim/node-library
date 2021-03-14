import { Router } from 'express';
import BooksController from '../controllers/books.controller';

const booksRouter = Router();
const booksController = new BooksController();

booksRouter.post('/book', booksController.create);
booksRouter.put('/book/:id', booksController.update);
booksRouter.get('/', booksController.findAll);
booksRouter.get('/book/:id', booksController.find);
booksRouter.delete('/book/:id', booksController.remove);

export default booksRouter;
