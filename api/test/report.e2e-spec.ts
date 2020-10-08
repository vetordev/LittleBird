import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { getConnection } from "typeorm";
import request from 'supertest';

describe('Report', () => {
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
    await getConnection().close();
    await app.close();
  });

  describe('Reportar um comentário', () => {

    let token;

    beforeAll(async () => {
        await getConnection().dropDatabase();
        await getConnection().synchronize();

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
          born_in: '2020-06-15'
        };

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
    let token;

    beforeAll(async () => {
        await getConnection().dropDatabase();
        await getConnection().synchronize();

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
          born_in: '2020-06-15'
        };
        const reply = {
          reply_id: 1,
          reply_content: '...',
          user_id: 1,
          comment_id: 1,
          publi_date: '2020-07-22'
        };

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