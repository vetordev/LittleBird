import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { getConnection } from "typeorm";
import * as request from 'supertest';

describe('Comment', () => {
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

  describe('Buscar Respostas', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      const forum = {
        forum_id: 1,
        forum_img_id: 1,
        title: 'Primeira vez',
        no_reply: 123123,
      };
      const comment = {
        comment_id: 1,
        forum_id: 1,
        user_id: 1,
        comment_content: '...',
        publi_date: '2020-03-08',
        no_reply: 10
      };
      const user = {
        user_id: 1,
        email: 'carlosboavida@gm.com',
        user_img_id: 1,
        user_pass: '123vidaboa',
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
      const reply_2 = {
        reply_id: 2,
        reply_content: '...',
        user_id: 1,
        comment_id: 1,
        publi_date: '2020-07-22'
      };

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      await getConnection().createQueryBuilder().insert().into('reply').values(reply).execute();
      await getConnection().createQueryBuilder().insert().into('reply').values(reply_2).execute();

      await getConnection().createQueryBuilder().insert().into('tb_comment').values(comment).execute();
    });

    it('> GET /comment/:comment_id/reply Deve retonar as repostas de um comentário', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .get(`/comment/${comment_id}/reply`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        reply_id: expect.any(Number),
        reply_content: expect.any(String),
        user_id: {
          user_id: expect.any(Number),
          username: expect.any(String),
          user_img_id: {
            user_img_id: expect.any(Number),
            img_url: expect.any(String)
          },
        },
        publi_date: expect.any(String)
      }));
    });
    it('> GET /comment/:comment_id/reply Não deve retonar as repostas de um comentário (Comentário não encontrado)', async () => {
      const comment_id = 2;
      const response = await request(app.getHttpServer())
        .get(`/comment/${comment_id}/reply`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Registrar um reply', () => {

    let token;

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      const forum = {
        forum_id: 1,
        forum_img_id: 1,
        title: 'Primeira vez',
        no_reply: 123123,
      };
      const comment = {
        comment_id: 1,
        forum_id: 1,
        user_id: 1,
        comment_content: '...',
        publi_date: '2020-03-08',
        no_reply: 10
      };
      const user = {
        user_id: 1,
        email: 'carlosboavida@gm.com',
        user_img_id: 1,
        user_pass: '123vidaboa',
        username: 'carlosboaviida',
        born_in: '2020-06-15'
      };

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      await getConnection().createQueryBuilder().insert().into('tb_comment').values(comment).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;
    });

    it('> POST /comment/:comment_id/reply Deve registrar um reply', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('> POST /comment/:comment_id/reply Não deve registrar um reply (Token JWT inválido)', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });

    it('> POST /comment/:comment_id/reply Não deve registrar um reply (Token JWT inválido)', async () => {
      const comment_id = 2;
      const response = await request(app.getHttpServer())
        .post(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Registrar comentário', () => {

    let token;

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      const forum = {
        forum_id: 1,
        forum_img_id: 1,
        title: 'Primeira vez',
        no_reply: 123123,
      };
      const user = {
        user_id: 1,
        email: 'carlosboavida@gm.com',
        user_img_id: 1,
        user_pass: '123vidaboa',
        username: 'carlosboaviida',
        born_in: '2020-06-15'
      };

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;
    });

    it('> POST /comment/:comment_id/reply Deve registrar um comentário', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          reply_content: '...'
        });

      expect(response.status).toBe(204);
    });

    it('> POST /comment/:comment_id/reply Não deve registrar um comentário (Token JWT inválido)', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}errado`)
        .send({
          reply_content: '...'
        });

      expect(response.status).toBe(401);
    });


    it('> POST /comment/:comment_id/reply Não deve registrar um comentário (Commentário não encontrado)', async () => {
      const comment_id = 2;
      const response = await request(app.getHttpServer())
        .post(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          reply_content: '...'
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Remover reply', async () => {

    let token;

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      const forum = {
        forum_id: 1,
        forum_img_id: 1,
        title: 'Primeira vez',
        no_reply: 123123,
      };
      const user = {
        user_id: 1,
        email: 'carlosboavida@gm.com',
        user_img_id: 1,
        user_pass: '123vidaboa',
        username: 'carlosboaviida',
        born_in: '2020-06-15'
      };

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;
    });

    it('> DELETE /comment/:comment_id/reply deve remover um comentário', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('> DELETE /comment/:comment_id/reply Não deve remover um comentário (Token JWT inválido)', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });

    it('> DELETE /comment/:comment_id/reply Não deve remover um comentário (Comentário não encontrado)', async () => {
      const comment_id = 2;
      const response = await request(app.getHttpServer())
        .delete(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('Remover um comentário', () => {
    let token;

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      const forum = {
        forum_id: 1,
        forum_img_id: 1,
        title: 'Primeira vez',
        no_reply: 123123,
      };
      const user = {
        user_id: 1,
        email: 'carlosboavida@gm.com',
        user_img_id: 1,
        user_pass: '123vidaboa',
        username: 'carlosboaviida',
        born_in: '2020-06-15'
      };

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;
    });

    it('> DELETE /comment/:comment_id/reply Deve remover um comentário', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('> DELETE /comment/:comment_id/reply Não deve remover um comentário (Token JWT inválido)', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });

    it('> DELETE /comment/:comment_id/reply Não deve remover um comentário (Comentário não encontrado)', async () => {
      const comment_id = 2;
      const response = await request(app.getHttpServer())
        .delete(`/comment/${comment_id}/reply`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});