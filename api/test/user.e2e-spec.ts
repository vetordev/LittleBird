import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from 'supertest';
import { CreateUserDto } from "src/user/user.dto";
import { getConnection } from "typeorm";

describe('User', () => {
  let app: INestApplication;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

  });

  afterAll(async () => {

    await app.close();
  });

  describe("Criar um usuário", () => {

    beforeAll(async () => {
      await getConnection().dropDatabase()
      await getConnection().synchronize();
      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
    });

    it('> POST /user - Deve criar um usuário', async () => {
      const user: CreateUserDto = {
        email: 'carlosboavida@gm.com',
        user_img_id: 1,
        user_pass: '123vidaboa',
        username: 'carlosboaviida',
        born_in: '2020-06-15'
      };

      const response = await request(app.getHttpServer())
        .post('/user')
        .send(user)

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining({
        token: expect.any(String)
      }));

    });

    it('> POST /user Não deve criar um usuário (Unique Key Error)', async () => {
      const user: CreateUserDto = {
        email: 'carlosboavida@gm.com',
        user_img_id: 1,
        user_pass: '123vidaboa',
        username: 'carlosboavida',
        born_in: '2020-06-15'
      };

      const response = await request(app.getHttpServer())
        .post('/user')
        .send(user);

      expect(response.status).toBe(409);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });

    it('> POST /user Não deve criar um usuário (Foreign Key Error)', async () => {
      const user: CreateUserDto = {
        email: 'carlosboavidala@gm.com',
        user_img_id: 2,
        user_pass: '123vidaboa',
        username: 'carlosboavida',
        born_in: '2020-06-15'
      };

      const response = await request(app.getHttpServer())
        .post('/user')
        .send(user);

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });

  });

  describe('Login do usuário', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase()
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values({ email: 'carlosboavida@gm.com',
                                                                                   user_img_id: 1,
                                                                                   user_pass: '123vidaboa',
                                                                                   username: 'carlosboaviida',
                                                                                   born_in: '2020-06-15'
                                                                                   }).execute();
    });

    it('> POST /auth/login Deve logar o usuário', async () => {
      const user = {
        email: 'carlosboavida@gm.com',
        user_pass: '123vidaboa'
      }

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining({
        token: expect.any(String),
      }));

    });

    it('> POST /auth/login Não deve logar o usuário', async () => {
      const user = {
        email: 'errado@gm',
        user_pass: '123vidaboa'
      }

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);

      expect(response.status).toBe(401);
      expect(response.body).not.toHaveProperty('token');
    });

  });

  describe('Buscar um usuário', () => {

    let token = null;
    beforeAll(async () => {
      await getConnection().dropDatabase()
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values({ email: 'carlosboavida@gm.com',
                                                                                   user_img_id: 1,
                                                                                   user_pass: '123vidaboa',
                                                                                   username: 'carlosboaviida',
                                                                                   born_in: '2020-06-15'
                                                                                   }).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;
    });

    it('> GET /user Deve retornar um usuário', async () => {

      const response = await request(app.getHttpServer())
        .get('/user')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        username: expect.any(String),
        email: expect.any(String),
        user_img_id: {
          user_img_id: expect.any(Number),
          img_url: expect.any(String)
        }
      }));

    });

    it('> GET /user Não deve retornar o usuário (Token JWT inválido)', async () => {

      const response = await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });
  });

  describe('Alterar um usuário', () => {

    let token = null;
    beforeAll(async () => {
      await getConnection().dropDatabase()
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values({ email: 'carlosboavida@gm',
                                                                                   user_img_id: 1,
                                                                                   user_pass: '123vidaboa',
                                                                                   username: 'carlosboaviida',
                                                                                   born_in: '2020-06-15'
                                                                                   }).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm', user_pass: '123vidaboa' });
      token = response.body.token;
    });

    it('> PUT /user Deve alterar o usuário', async () => {

      const user = {
        email: 'carlosboaalt@gm.com',
        user_img_id: 1,
        username: 'carlosboaal',
        born_in: '2020-06-17'
      };
      const response = await request(app.getHttpServer())
        .put('/user')
        .set('Authorization', `Bearer ${token}`)
        .send(user);

      expect(response.status).toBe(204);

    });

    it('> PUT /user Não deve alterar o usuário (Token JWT inválido)', async () => {
      const user = {
        email: 'carlosboa-alt@gm',
        user_img_id: 1,
        username: 'carlosboaaltalt',
        born_in: '2020-06-17'
      };
      const response = await request(app.getHttpServer())
        .put('/user')
        .set('Authorization', `Bearer ${token}errado`)
        .send(user);

      expect(response.status).toBe(401);
    });
  });

});