import { fakeBook1, fakeBook2 } from '@shared/providers/fakes/FakeObjs';
import 'dotenv/config';
import request from 'supertest';
import { uuid } from 'uuidv4';

let tokenAuthenticated: any;

const host = process.env.APP_API_URL;

describe('TEST BOOKS', () => {
  beforeAll(async () => {
    const response = await request(host).post('/sessions').send({
      email: 'dario.sjc@gmail.com',
      password: '123456',
    });
    tokenAuthenticated = response.body.token; // save the token!
  });
  it('CREATE:BOOK RETURN status 200', async () => {
    const result = await request(host)
      .post(`/books/book`)
      .send(fakeBook1)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAuthenticated}`);
    // asserções

    fakeBook1.id = result.body.id;
    expect(result.status).toEqual(200);
  });

  it('UPDATE:BOOK RETURN status 200', async () => {
    const result = await request(host)
      .put(`/books/book/${fakeBook1.id}`)
      .send({
        ...fakeBook2,
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAuthenticated}`);
    // asserções
    expect(result.status).toEqual(200);
  });

  it('UPDATE NONEXISTENT: RETURN status 404', async () => {
    const result = await request(host)
      .put(`/books/book/${uuid()}`)
      .send({
        ...fakeBook2,
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAuthenticated}`);
    // asserções
    expect(result.status).toEqual(404);
  });

  it('FIND BY ID:BOOK RETURN 200', async () => {
    const result = await request(host)
      .get(`/books/book/${fakeBook1.id}`)
      .set('Authorization', `Bearer ${tokenAuthenticated}`);
    // asserções
    expect(result.status).toEqual(200);
  });

  it('FIND BY ID NONEXISTENT:BOOK RETURN 404', async () => {
    const result = await request(host)
      .get(`/books/book/${uuid()}`)
      .set('Authorization', `Bearer ${tokenAuthenticated}`);
    // asserções
    expect(result.status).toEqual(404);
  });

  it('FIND ALL:BOOKS RETURN 200', async () => {
    const result = await request(host)
      .get(`/books/`)
      .set('Authorization', `Bearer ${tokenAuthenticated}`);
    // asserções
    expect(result.status).toEqual(200);
  });

  it('REMOVE:BOOK RETURN 200', async () => {
    const result = await request(host)
      .delete(`/books/book/${fakeBook1.id}`)
      .set('Authorization', `Bearer ${tokenAuthenticated}`);
    // asserções
    expect(result.status).toEqual(200);
  });

  it('REMOVE NONEXISTENT BOOK: RETURN 404', async () => {
    const result = await request(host)
      .delete(`/books/book/${uuid()}`)
      .set('Authorization', `Bearer ${tokenAuthenticated}`);
    // asserções
    expect(result.status).toEqual(404);
  });

  it('FIND ALL: BOOKS RETURN PAGE PROPERY WITH 1 PER PAGE CORRECT', async () => {
    // cria os dois objetos
    const book1 = await request(host)
      .post(`/books/book`)
      .send(fakeBook1)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAuthenticated}`);

    fakeBook1.id = book1.body.id;

    const book2 = await request(host)
      .post(`/books/book`)
      .send(fakeBook2)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAuthenticated}`);

    fakeBook2.id = book2.body.id;

    const result = await request(host)
      .get(`/books?firstPage=1&resultsPerPage=1&limitResults=10000000000`)
      .set('Authorization', `Bearer ${tokenAuthenticated}`);
    // asserções
    expect(result.body[result.body.length - 1]).toHaveProperty(
      'page',
      result.body.length,
    );
  });

  it('FIND ALL:BOOKS RETURN PAGE PROPERY WITH 2 PER PAGE CORRECT', async () => {
    // cria os dois objetos
    const book1 = await request(host)
      .post(`/books/book`)
      .send(fakeBook1)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAuthenticated}`);

    fakeBook1.id = book1.body.id;

    const book2 = await request(host)
      .post(`/books/book`)
      .send(fakeBook2)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAuthenticated}`);

    fakeBook2.id = book2.body.id;

    const result = await request(host)
      .get(`/books?firstPage=1&resultsPerPage=2&limitResults=10000000000`)
      .set('Authorization', `Bearer ${tokenAuthenticated}`);
    // asserções
    expect(result.body[result.body.length - 1]).toHaveProperty(
      'page',
      Math.ceil(result.body.length / 2),
    );
    expect(result.body[result.body.length - 2]).toHaveProperty(
      'page',
      result.body.length % 2 === 1
        ? Math.ceil(result.body.length / 2) - 1
        : Math.ceil(result.body.length / 2),
    );
  });
});
