import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import FindAllUserService from '@modules/users/services/FindAllUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone, age } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      phone,
      age,
    });

    return response.json(classToClass(user));
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { limitResults, resultsPerPage, firstPage } = request.query;

    // valores default caso não sejam informados
    const limitResultsAux = limitResults
      ? parseInt(limitResults.toString(), 10)
      : 500;
    const resultsPerPageAux = resultsPerPage
      ? parseInt(resultsPerPage.toString(), 10)
      : 10;

    const firstPageAux = firstPage ? parseInt(firstPage.toString(), 10) : 1;

    const users = await container.resolve(FindAllUserService).execute({
      limitResults: limitResultsAux,
      resultsPerPage: resultsPerPageAux,
      firstPage: firstPageAux,
    });

    // adicionando a propriedade page, que indica a página do valor
    const usersPaginated = users.map((user, index) => {
      const indexUser = index + 1;
      const page = Math.ceil(indexUser / resultsPerPageAux);
      const pageOffset =
        page === 0 || page === 1 ? firstPageAux : firstPageAux + (page - 1);
      return { ...user, page: pageOffset };
    });

    return response.json(usersPaginated);
  }
}
