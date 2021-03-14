import Book from '../infra/typeorm/entities/Book';

export default interface IFilterBookDTO {
  filterConditions?: Partial<Book>[];
  onlyFields?: (keyof Book)[];
}
