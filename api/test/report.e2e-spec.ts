import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { getConnection } from "typeorm";
import request from 'supertest';

describe('Report', () => {
  let app: INestApplication;
  let token;

  const forum = {
    forum_id: 1,
    forum_img_id: 1,
    title: 'Primeira vez',
    no_like: 123123,
    forum_description: 'Lorem ipsum dolor sit amet',
    publi_date: '2020-06-15'
  };
  const comment = {
    comment_id: 1,
    forum_id: 1,
    user_id: 1,
    comment_content: '...',
    publi_date: '2020-03-08',
    no_like: 10
  };
  const user = {
    user_id: 1,
    email: 'carlosboavida@gm.com',
    user_img_id: 1,
    user_pass: '7f69c888bd3d61f20070fae8781a6b355c549b92e76e2955818eb75563a61b15',
    username: 'carlosboaviida',
    born_in: '2020-06-15',
    fullname: 'vitoria da silva'
  };
  const reply = {
    reply_id: 1,
    reply_content: '...',
    user_id: 1,
    comment_id: 1,
    publi_date: '2020-07-22'
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

  describe('Buscar os tipos de denúncia', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into('report_type').values({ report_type_id: 1, report_type_name: 'Abuso Verbal', report_type_especification: 'lorem ipsum dolor sit amet.' }).execute();
      await getConnection().createQueryBuilder().insert().into('report_type').values({ report_type_id: 2, report_type_name: 'Abuso Verbal', report_type_especification: 'lorem ipsum dolor sit amet.' }).execute();
      await getConnection().createQueryBuilder().insert().into('report_type').values({ report_type_id: 3, report_type_name: 'Abuso Verbal', report_type_especification: 'lorem ipsum dolor sit amet.' }).execute();
      await getConnection().createQueryBuilder().insert().into('report_type').values({ report_type_id: 4, report_type_name: 'Abuso Verbal', report_type_especification: 'lorem ipsum dolor sit amet.' }).execute();
      await getConnection().createQueryBuilder().insert().into('report_type').values({ report_type_id: 5, report_type_name: 'Abuso Verbal', report_type_especification: 'lorem ipsum dolor sit amet.' }).execute();
    });

    it('> GET /report/type Deve buscar os tipos de denúncias', async () => {

      const response = await request(app.getHttpServer())
        .get('/report/type')

      expect(response.status).toBe(200)
      expect(response.body[0]).toEqual(expect.objectContaining({
        report_type_id: expect.any(Number),
        report_type_name: expect.any(String),
        report_type_especification: expect.any(String)
      }));
    });

  });

  describe('Reportar um comentário', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      await getConnection().createQueryBuilder().insert().into('tb_comment').values(comment).execute();

      await getConnection().createQueryBuilder().insert().into('report_type').values({ report_type_id: 1, report_type_name: 'Abuso Verbal', report_type_especification: 'lorem ipsum dolor sit amet.' }).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;
    });

    it('> POST /report/comment/:comment_id Deve reportar um comentário', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/report/comment/${comment_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          report_content: 'lorem ipsum dolor sit amet.',
          report_type: 1
        });

      expect(response.status).toBe(204);
    });

    it('> POST /report/comment/:comment_id Não deve reportar um comentário (Token JWT inválido)', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/report/comment/${comment_id}`)
        .set('Authorization', `Bearer ${token}errado`)
        .send({
          report_content: 'lorem ipsum dolor sit amet.',
          report_type: 1
        });

      expect(response.status).toBe(401);
    });

    it('> POST /report/comment/:comment_id Não deve reportar um comentário (Comentário não encontrado)', async () => {
      const comment_id = 2;
      const response = await request(app.getHttpServer())
        .post(`/report/comment/${comment_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          report_content: 'lorem ipsum dolor sit amet.',
          report_type: 1
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Reportar uma resposta', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      await getConnection().createQueryBuilder().insert().into('tb_comment').values(comment).execute();

      await getConnection().createQueryBuilder().insert().into('reply').values(reply).execute();

      await getConnection().createQueryBuilder().insert().into('report_type').values({ report_type_id: 1, report_type_name: 'Abuso Verbal', report_type_especification: 'lorem ipsum dolor sit amet.' }).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;
    });

    it('> POST /report/reply/:reply_id Deve reportar uma resposta', async () => {
      const reply_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/report/reply/${reply_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          report_content: 'lorem ipsum dolor sit amet',
          report_type: 1
        });
      expect(response.status).toBe(204);
    });

    it('> POST /report/reply/:reply_id Não deve reportar uma resposta (Token JWT inválido)', async () => {
      const reply_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/report/reply/${reply_id}`)
        .set('Authorization', `Bearer ${token}errado`)
        .send({
          report_content: 'lorem ipsum dolor sit amet',
          report_type: 1
        });
      expect(response.status).toBe(401);
    });

    it('> POST /report/reply/:reply_id Não deve reportar uma resposta (Resposta não encontrada)', async () => {
      const reply_id = 2;
      const response = await request(app.getHttpServer())
        .post(`/report/reply/${reply_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          report_content: 'lorem ipsum dolor sit amet',
          report_type: 1
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });
});