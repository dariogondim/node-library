import CreateBookService from '@modules/books/services/Create.book.service';
import FindAllBookService from '@modules/books/services/FindAll.book.service';
import FindByIdBookService from '@modules/books/services/FindById.book.service';
import RemoveBookService from '@modules/books/services/Remove.book.service';
import UpdateBookService from '@modules/books/services/Update.book.service';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class BooksControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      isbn,
      title,
      category,
      edition,
      author,
      publishing,
      editionYear,
      numberPages,
    } = request.body;

    const { user_id } = request.body;

    const book = await container.resolve(CreateBookService).execute({
      isbn,
      title,
      category,
      edition,
      author,
      publishing,
      editionYear,
      numberPages,
      user_id,
    });

    return response.json(classToClass(book));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      isbn,
      title,
      category,
      edition,
      author,
      publishing,
      editionYear,
      numberPages,
    } = request.body;

    const { user_id } = request.body;

    const { id } = request.params;

    const book = await container.resolve(UpdateBookService).execute({
      id,
      isbn,
      title,
      category,
      edition,
      author,
      publishing,
      editionYear,
      numberPages,
      user_id,
    });

    return response.json(classToClass(book));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    const { id } = request.params;

    const messageSuccess = await container.resolve(RemoveBookService).execute({
      id,
      user_id,
    });

    return response.json({ message: messageSuccess });
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    const { id } = request.params;

    const findBook = container.resolve(FindByIdBookService);

    const book = await findBook.execute({
      id,
      user_id,
    });

    return response.json(book);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { limitResults, resultsPerPage, firstPage } = request.query;
    const { user_id } = request.body;

    // valores default caso não sejam informados
    const limitResultsAux = limitResults
      ? parseInt(limitResults.toString(), 10)
      : 500;
    const resultsPerPageAux = resultsPerPage
      ? parseInt(resultsPerPage.toString(), 10)
      : 10;

    const firstPageAux = firstPage ? parseInt(firstPage.toString(), 10) : 1;

    const books = await container.resolve(FindAllBookService).execute({
      limitResults: limitResultsAux,
      resultsPerPage: resultsPerPageAux,
      firstPage: firstPageAux,
      user_id,
    });

    // adicionando a propriedade page, que indica a página do valor
    const booksPaginateds = books.map((book, index) => {
      const indexBook = index + 1;
      const page = Math.ceil(indexBook / resultsPerPageAux);
      const pageOffset =
        page === 0 || page === 1 ? firstPageAux : firstPageAux + (page - 1);
      return { ...book, page: pageOffset };
    });

    return response.json(booksPaginateds);
  }
}
