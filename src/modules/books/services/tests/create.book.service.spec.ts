import FakeBooksRepository from '@modules/books/repositories/fakes/fake.books.repository';
import AppError from '@shared/errors/AppError';
import fakeDatabase from '@shared/providers/fakes/FakeDatabase';
import { fakeBook1, fakeBook2 } from '@shared/providers/fakes/FakeObjs';
import { uuid } from 'uuidv4';
import CreateBookService from '../create.book.service';
import FindAllBookService from '../findAll.book.service';
import FindByIdBookService from '../findById.book.service';
import RemoveBookService from '../remove.book.service';
import UpdateBookService from '../update.book.service';

let fakeRepository: FakeBooksRepository;

let createService: CreateBookService;
let updateService: UpdateBookService;
let findByIdService: FindByIdBookService;
let removeService: RemoveBookService;
let findAllService: FindAllBookService;

describe('Test BOOKS', () => {
  beforeEach(() => {
    fakeDatabase.resetDatabase();

    fakeRepository = new FakeBooksRepository();

    createService = new CreateBookService(fakeRepository);
    updateService = new UpdateBookService(fakeRepository);
    findByIdService = new FindByIdBookService(fakeRepository);
    removeService = new RemoveBookService(fakeRepository);
    findAllService = new FindAllBookService(fakeRepository);
  });

  it('CREATE:book returns ID', async () => {
    const book = await createService.execute({ ...fakeBook1 });

    await expect(book).toHaveProperty('id');
  });

  it('CREATE REPEATED ISBN:book HAVE THROW ERROR', async () => {
    await createService.execute({ ...fakeBook1 });
    const book2 = createService.execute({ ...fakeBook1 }); // mesmo objeto, mesmo isbn

    await expect(book2).rejects.toBeInstanceOf(AppError); // que lançe um erro
  });

  it('UPDATE:book had its PROPERTIES UPDATED', async () => {
    const { title, editionYear, isbn, id } = await await createService.execute({
      ...fakeBook1,
    });

    fakeBook2.id = id; // altera o id,para simular o update

    const productChanged = await updateService.execute({
      ...fakeBook2,
    });

    expect(productChanged.id).toEqual(id); // que eles tenham o mesmo id
    expect(productChanged.editionYear).not.toEqual(editionYear); // que o ano de edição tenha mudado
    expect(productChanged.isbn).not.toEqual(isbn); // que o isbn tenha mudado
    expect(productChanged.title).not.toEqual(title); // que o título tenha mudado
  });

  it('UPDATE REPEATED ISBN:book HAVE THROW ERROR', async () => {
    fakeBook1.id = undefined;
    const { isbn } = await createService.execute({
      ...fakeBook1,
    });

    fakeBook2.id = undefined;
    const book2 = await createService.execute({
      ...fakeBook2,
    });

    book2.isbn = isbn; // altera o isbn para ser igual ao do primeiro e gerar o erro

    const bookChanged = updateService.execute({
      ...book2,
    });

    await expect(bookChanged).rejects.toBeInstanceOf(AppError); // que lançe um erro
  });

  it('UPDATE NONEXISTENT:book HAVE THROW ERROR', async () => {
    fakeBook2.id = uuid(); // altera o id,para simular um livros que não existe

    const bookChanged = updateService.execute({
      ...fakeBook2,
    });

    await expect(bookChanged).rejects.toBeInstanceOf(AppError); // que lançe um erro
  });

  it('FIND BY ID:book RETURNS THE CORRECT book', async () => {
    const { id } = await createService.execute({ ...fakeBook1 });
    const findBook = await findByIdService.execute({ id });

    expect(findBook).toHaveProperty('id'); // que tenha a propriedade id
    expect(findBook.id).toEqual(id); // que seja igual ao id do livro recém inserido
  });

  it('FIND BY ID NONEXISTENT:book must RETURN WITH ERROR', async () => {
    await createService.execute({ ...fakeBook1 });
    const findBook = findByIdService.execute({
      id: uuid(),
    }); // usa um id que não existe

    await expect(findBook).rejects.toBeInstanceOf(AppError); // que lançe um erro
  });

  it('REMOVE:book must RETURN A STRING', async () => {
    const { id } = await createService.execute({ ...fakeBook1 });

    const findBook = removeService.execute({
      id,
    });

    await expect(findBook).resolves.not.toThrowError(); // que não lançe um erro
  });

  it('REMOVE NONEXISTENTs:book must RETURN WITH ERROR', async () => {
    await createService.execute({ ...fakeBook1 });

    const findBook = removeService.execute({
      id: uuid(),
    }); // usa um id que não existe

    await expect(findBook).rejects.toBeInstanceOf(AppError); // que lançe um erro
  });

  it('FIND ALL:books RETURN an EMPTY ARRAY', async () => {
    const findAllBooks = await findAllService.execute({
      limitResults: 10, // valores irrelevantes
      resultsPerPage: 2, // valores irrelevantes
      firstPage: 1, // valores irrelevantes
    });

    await expect(findAllBooks).toEqual([]); // um array vazio
  });

  it('FIND ALL:books RETURN objects equal the OBJECTS INSERTED', async () => {
    const book = await createService.execute({ ...fakeBook1 });
    const book2 = await createService.execute({ ...fakeBook2 });
    const findAllBooks = await findAllService.execute({
      limitResults: 10, // valores irrelevantes
      resultsPerPage: 2, // valores irrelevantes
      firstPage: 1, // valores irrelevantes
    });

    await expect(findAllBooks).toEqual([{ ...book }, { ...book2 }]); // um array com um elemento exatamente igual ao livro recém inserido
  });
});
