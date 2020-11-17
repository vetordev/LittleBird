import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import request from 'supertest';
import { CreateUserDto } from "src/user/user.dto";
import { getConnection, Repository } from "typeorm";

describe('User', () => {
  let app: INestApplication;
  let token;

  const user = {
    email: 'carlosboavida@gm.com',
    user_img_id: 1,
    user_pass: '123vidaboa',
    username: 'carlosboaviida',
    born_in: '2020-06-15',
    fullname: 'vitoria da silva'
  };


  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

  });

  afterAll(async () => {
    await getConnection().close();
    await app.close();
  });

  describe("Criar um usuário", () => {

    beforeAll(async () => {
      await getConnection().dropDatabase()
      await getConnection().synchronize();
      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
    });

    it('> POST /user - Deve criar um usuário', async () => {

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
        born_in: '2020-06-15',
        fullname: 'vitoria da silva'
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
        email: 'carlosboavidaa@gm.com',
        user_img_id: 2,
        user_pass: '123vidaboa',
        username: 'carlosaboavida',
        born_in: '2020-06-15',
        fullname: 'vitoria da silva'
      };
      const response = await request(app.getHttpServer())
        .post('/user')
        .send(user);

      expect(response.status).toBe(404);
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
                                                                                   user_pass: '7f69c888bd3d61f20070fae8781a6b355c549b92e76e2955818eb75563a61b15',
                                                                                   username: 'carlosboaviida',
                                                                                   born_in: '2020-06-15',
                                                                                   fullname: 'vitoria da silva'
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
        user_id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        user_img_id: expect.any(Number),
        fullname: expect.any(String),
        born_in: expect.any(String)
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

    beforeAll(async () => {
      await getConnection().dropDatabase()
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values({ email: 'carlosboavida@gm.com',
                                                                                   user_img_id: 1,
                                                                                   user_pass: '7f69c888bd3d61f20070fae8781a6b355c549b92e76e2955818eb75563a61b15',
                                                                                   username: 'carlosboaviida',
                                                                                   born_in: '2020-06-15',
                                                                                   fullname: 'vitoria da silva'
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
        user_id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        user_img_id: {
          user_img_id: expect.any(Number),
          img_url: expect.any(String)
        },
        fullname: expect.any(String)
      }));

    });

    it('> GET /user Não deve retornar o usuário (Token JWT inválido)', async () => {

      const response = await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });
  });

  describe('Buscar Imagem de Usuário', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase()
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 2, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 3, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 4, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 5, img_url: "http://localhost:4456" }).execute();

    });

    it('> GET /user/img Deve buscar as imagens de perfil dos usuários', async () => {

      const response = await request(app.getHttpServer())
        .get('/user/img');

      expect(response.status).toBe(200)
      expect(response.body[0]).toEqual(expect.objectContaining({
        user_img_id: expect.any(Number),
        img_url: expect.any(String)
      }));
    });

  });

  describe('Alterar um usuário', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase()
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values({ email: 'carlosboavida@gm.com',
                                                                                   user_img_id: 1,
                                                                                   user_pass: '7f69c888bd3d61f20070fae8781a6b355c549b92e76e2955818eb75563a61b15',
                                                                                   username: 'carlosboaviida',
                                                                                   born_in: '2020-06-15',
                                                                                   fullname: 'vitoria da silva'
                                                                                   }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values({ email: 'carlosboalife@gm.com',
                                                                                   user_img_id: 1,
                                                                                   user_pass: '7f69c888bd3d61f20070fae8781a6b355c549b92e76e2955818eb75563a61b15',
                                                                                   username: 'carlosboavida',
                                                                                   born_in: '2020-06-15',
                                                                                   fullname: 'vitoria da silva'
                                                                                   }).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;
    });

    it('> PUT /user Deve alterar o usuário', async () => {

      const user = {
        email: 'carlosboaalt@gm.com',
        user_img_id: 1,
        username: 'carlosboaal',
        born_in: '2020-06-17',
        fullname: 'vitoria lopes'
      };
      const response = await request(app.getHttpServer())
        .put('/user')
        .set('Authorization', `Bearer ${token}`)
        .send(user);

      expect(response.status).toBe(204);

    });

    it('> PUT /user Não deve alterar o usuário (Token JWT inválido)', async () => {
      const user = {
        email: 'carlosboa-alt@gm.com',
        user_img_id: 1,
        username: 'carlosboaaltalt',
        born_in: '2020-06-17',
        fullname: 'vitoria da silva'
      };
      const response = await request(app.getHttpServer())
        .put('/user')
        .set('Authorization', `Bearer ${token}errado`)
        .send(user);

      expect(response.status).toBe(401);
    });

    it('> PUT /user Não deve alterar o usuário (Unique Key)', async () => {
      const user = {
        email: 'carlosboalife@gm.com',
        user_img_id: 1,
        username: 'carlosboavida',
        born_in: '2020-06-15',
        fullname: 'vitoria da silva'
      };

      const response = await request(app.getHttpServer())
        .put('/user')
        .set('Authorization', `Bearer ${token}`)
        .send(user);

      expect(response.status).toBe(409);
    });

    it('> PUT /user Não deve alterar o usuário (Foreign Key)', async () => {
      const user = {
        email: 'carlosboalifee@gm.com',
        user_img_id: 2,
        username: 'carlosboaviida',
        born_in: '2020-06-15',
        fullname: 'vitoria da silva'
      };

      const response = await request(app.getHttpServer())
        .put('/user')
        .set('Authorization', `Bearer ${token}`)
        .send(user);

      expect(response.status).toBe(404);
    });
  });

  describe('Buscar e-mail do usuário', () => {

    beforeAll( async () => {
      await getConnection().dropDatabase()
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values({ email: 'carlosboavida@gm.com',
                                                                                 user_img_id: 1,
                                                                                 user_pass: '7f69c888bd3d61f20070fae8781a6b355c549b92e76e2955818eb75563a61b15',
                                                                                 username: 'carlosboaviida',
                                                                                 born_in: '2020-06-15',
                                                                                 fullname: 'vitoria da silva'
                                                                                 }).execute();
    });

    it('> GET /user/email Deve encontrar o e-mail do usuário', async () => {
      const email = 'carlosboavida@gm.com';

      const response = await request(app.getHttpServer())
        .get(`/user/email?email=${email}`)

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        email: expect.any(Boolean),
        username: expect.any(String)
      }));
      expect(response.body.email).toBe(true);
    });

    it('> GET /user/email Não deve encontrar o e-mail do usuário (e-mail não encontrado)', async () => {
      const email = 'carlosboaida@gm.com';

      const response = await request(app.getHttpServer())
        .get(`/user/email?email=${email}`)

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        email: expect.any(Boolean)
      }));
      expect(response.body.email).toBe(false);
    });

    it('> GET /user/email Não deve encontrar o e-mail do usuário (e-mail não enviado ou inválido)', async () => {
      const email = 'carlosboaida';
      const response = await request(app.getHttpServer())
        .get('/user/email')
        .send({ email });

      expect(response.status).toBe(400);

    });
  });

});