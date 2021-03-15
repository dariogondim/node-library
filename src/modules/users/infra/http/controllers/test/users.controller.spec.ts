import { fakeUser1 } from '@shared/providers/fakes/FakeObjs';
import 'dotenv/config';
import request from 'supertest';

let tokenAuthenticated: any;

const host = process.env.APP_API_URL;

describe('TEST FAVORITE SERVICE', () => {
  beforeAll(async () => {
    await request(host)
      .post('/users')
      .send(fakeUser1)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    const response = await request(host).post('/sessions').send({
      email: fakeUser1.email,
      password: fakeUser1.password,
    });
    tokenAuthenticated = response.body.token; // save the token!
  });

  it('CREATE:BOOKS FAVORITE RETURN status 200 and have property favoriteBooks', async () => {
    const profile = await request(host)
      .get(`/profile`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAuthenticated}`);

    // asserções
    expect(profile.status).toEqual(200);
    expect(profile.body).toHaveProperty('favoriteBooks'); // que tenha a propriedade favoriteBooks
  });
});
