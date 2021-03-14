import ICreateBookDTO from '@modules/books/dtos/ICreate.book.dto';
import IFindAllBookDTO from '@modules/books/dtos/IFindAll.book.dto';
import IFindByIdBookDTO from '@modules/books/dtos/IFindById.book.dto';
import IRemoveBookDTO from '@modules/books/dtos/IRemove.book.dto';
import IUpdateBookDTO from '@modules/books/dtos/IUpdate.book.dto';
import Book from '@modules/books/infra/typeorm/entities/Book';

export default interface IProductsRepository {
  create(data: ICreateBookDTO): Promise<Book>;
  update(data: IUpdateBookDTO): Promise<Book>;
  find(data: IFindByIdBookDTO): Promise<Book | undefined>;
  findAll(data: IFindAllBookDTO): Promise<Book[]>;
  remove(data: IRemoveBookDTO): Promise<boolean>;
}
