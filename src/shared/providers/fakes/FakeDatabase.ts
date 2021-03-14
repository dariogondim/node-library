import Book from '@modules/books/infra/typeorm/entities/Book';

class FakeDatabase {
  fakeBooks: Book[];

  // fakeOrders: Order[];

  public resetDatabase(): void {
    this.fakeBooks = [];
    // this.fakeProducts = [];
  }
}

const fakeDatabase: FakeDatabase = new FakeDatabase();

export default fakeDatabase;
