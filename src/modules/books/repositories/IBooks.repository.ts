import ICreateBookDTO from '@modules/books/dtos/ICreate.book.dto';
import IFindAllBookDTO from '@modules/books/dtos/IFindAll.book.dto';
import IFindByIdBookDTO from '@modules/books/dtos/IFindById.book.dto';
import IRemoveBookDTO from '@modules/books/dtos/IRemove.book.dto';
import IUpdateBookDTO from '@modules/books/dtos/IUpdate.book.dto';
import Book from '@modules/books/infra/typeorm/entities/Book';
import IFilterBookDTO from '../dtos/IFilter.book.dto';

export default interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
  update(data: IUpdateBookDTO): Promise<Book>;
  find(data: IFindByIdBookDTO): Promise<Book | undefined>;
  filter(data: IFilterBookDTO): Promise<Book[]>;
  findAll(data: IFindAllBookDTO): Promise<Book[]>;
  remove(data: IRemoveBookDTO): Promise<boolean>;
}
