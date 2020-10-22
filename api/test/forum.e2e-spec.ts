import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { getConnection } from "typeorm";
import request from 'supertest';

describe('Forum', () => {
  let app: INestApplication;
  let token;

  const forum = {
    forum_id: 1,
    forum_img_id: 1,
    title: 'Primeira vez',
    no_like: 1,
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

  describe('Buscar um fórum', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("theme_img").values({ theme_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("theme").values({ theme_id: 1, theme_name: "Sexo", theme_img_id: 1 }).execute();
      await getConnection().createQueryBuilder().insert().into("theme_img").values({ theme_img_id: 2, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("theme").values({ theme_id: 2, theme_name: "Casamento", theme_img_id: 2 }).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      await getConnection().createQueryBuilder().insert().into("theme_forum").values({ theme_forum_id: 1, theme_id: 1, forum_id: 1 }).execute();
      await getConnection().createQueryBuilder().insert().into("theme_forum").values({ theme_forum_id: 2, theme_id: 2, forum_id: 1 }).execute();

      await getConnection().createQueryBuilder().insert().into('tb_comment').values(comment).execute();
    });

    it('> GET /forum/:forum_id/comment Deve retonar um fórum se seus comentários', async () => {
      const forum_id = 1;
      const response = await request(app.getHttpServer())
        .get(`/forum/${forum_id}/comment?page=1`);

      expect(response.status).toBe(200);
      expect(response.header['x-total-count']).toBe("1");
      expect(response.body).toEqual(expect.objectContaining({
        forum_id: expect.any(Number),
        title: expect.any(String),
        no_like: expect.any(Number),
        forum_img_id: {
          forum_img_id: expect.any(Number),
          img_url: expect.any(String)
        },
        forum_description: expect.any(String),
        publi_date: expect.any(String),
        themes: [
          {
            theme_id: expect.any(Number),
            theme_name: expect.any(String)
          },
          {
            theme_id: expect.any(Number),
            theme_name: expect.any(String)
          }
        ],
        comments: [
          {
            comment_id: expect.any(Number),
            user_id: {
              user_id: expect.any(Number),
              username: expect.any(String),
              user_img_id: {
                user_img_id: expect.any(Number),
                img_url: expect.any(String)
              },
            },
            comment_content: expect.any(String),
            publi_date: expect.any(String),
            no_like: expect.any(Number)
          }
        ]
      }));
    });

    it('> GET /forum/:forum_id/comment Não deve retornar um fórum (Forum não encontrado)', async () => {
      const forum_id = 2;

      const response = await request(app.getHttpServer())
        .get(`/forum/${forum_id}/comment?page=1`)

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Buscar fóruns', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      const comment2 = {
        comment_id: 2,
        forum_id: 1,
        user_id: 1,
        comment_content: '...',
        publi_date: '2020-03-08',
        no_like: 10
      };
      const forum2 = {
        forum_id: 2,
        forum_img_id: 2,
        title: 'Primeira vez',
        no_like: 12,
        forum_description: 'Lorem ipsum dolor sit amet',
        publi_date: '2020-06-15'
      };


      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("theme_img").values({ theme_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("theme").values({ theme_id: 1, theme_name: "Sexo", theme_img_id: 1 }).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 2, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum2).execute();

      await getConnection().createQueryBuilder().insert().into('tb_comment').values(comment).execute();
      await getConnection().createQueryBuilder().insert().into('tb_comment').values(comment2).execute();

      await getConnection().createQueryBuilder().insert().into("theme_forum").values({ theme_forum_id: 1, theme_id: 1, forum_id: 1 }).execute();
      await getConnection().createQueryBuilder().insert().into("theme_forum").values({ theme_forum_id: 2, theme_id: 1, forum_id: 2 }).execute();

      await getConnection().createQueryBuilder().insert().into("like_forum").values({ like_forum_id: 1, user_id: 1, forum_id: 1 }).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;

    });

    it('> GET /forum/theme/:theme_id/like Deve retornar os fóruns de um tema ordenados pelo like', async () => {
      const theme_id = 1;
      const response = await request(app.getHttpServer())
        .get(`/forum/theme/${theme_id}/like?page=1`);

      expect(response.status).toBe(200);
      expect(response.header['x-total-count']).toBe("1");
      expect(response.body[0]).toEqual(expect.objectContaining({
        forum_id: expect.any(Number),
        title: expect.any(String),
        no_like: expect.any(Number),
        img_url: expect.any(String)
      }));
    });
    it('> GET /forum/theme/:theme_id/like Não deve retornar os fóruns (Tema não encontrado)', async () => {
      const theme_id = 2;
      const response = await request(app.getHttpServer())
        .get(`/forum/theme/${theme_id}/like?page=1`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });

    it('> GET /forum Deve retornar os fóruns ordenados pelo like', async () => {
      const response = await request(app.getHttpServer())
        .get(`/forum?page=1`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.header['x-total-count']).toBe("1");
      expect(response.body[0]).toEqual(expect.objectContaining({
        forum_id: expect.any(Number),
        title: expect.any(String),
        no_like: expect.any(Number),
        img_url: expect.any(String),
        no_comment: expect.any(String),
      }));
    });

    it('> GET /forum/user/like Deve retornar os fóruns com like do usuário', async () => {
      const response = await request(app.getHttpServer())
        .get(`/forum/user/like?page=1`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.header['x-total-count']).toBe("1");
      expect(response.body[0]).toEqual(expect.objectContaining({
        forum_id: expect.any(Number),
        title: expect.any(String),
        no_like: expect.any(Number),
        forum_img_id: {
          forum_img_id: expect.any(Number),
          img_url: expect.any(String)
        },
      }));
    });

    it('> GET /forum/user/like Não deve retornar os fóruns com like do usuário (Token JWT inválido)', async () => {
      const response = await request(app.getHttpServer())
      .get(`/forum/user/like?page=1`)
      .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });
  });

  describe('Comentar num fórum', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;

    });

    it('> POST /forum/:forum_id/comment Deve registrar um comentário', async () => {
      const forum_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/forum/${forum_id}/comment`)
        .send({ comment_content: '...' })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('> POST /forum/:forum_id/comment Não deve registrar um comentário (Token JWT inválido)', async () => {
      const forum_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/forum/${forum_id}/comment`)
        .send({ comment_content: '...' })
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });

    it('> POST /forum/:forum_id/comment Não deve registrar um comentário (Fórum não encontrado)', async () => {
      const forum_id = 2;
      const response = await request(app.getHttpServer())
        .post(`/forum/${forum_id}/comment`)
        .send({ comment_content: '...' })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Registrar um like', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      // await getConnection().createQueryBuilder().insert().into("like_forum").values({ like_forum_id: 1, user_id: 1, forum_id: 1 }).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;

    });

    it('> POST /forum/:forum_id/like Deve registrar um like', async () => {
      const forum_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/forum/${forum_id}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('> POST /forum/:forum_id/like Não deve registrar um like (Token JWT inválido)', async () => {
      const forum_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/forum/${forum_id}/like`)
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });

    it('> POST /forum/:forum_id/like Não deve registrar um like (Forum não encontrado)', async () => {
      const forum_id = 2;
      const response = await request(app.getHttpServer())
        .post(`/forum/${forum_id}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));

    });
  });

  describe('Remover um comentário', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      await getConnection().createQueryBuilder().insert().into('tb_comment').values(comment).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;

    });

    it('> DELETE /forum/comment/:comment_id Deve remover um comentário', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/forum/comment/${comment_id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);

    });

    it('> DELETE /forum/comment/:comment_id Não deve remover um comentário (Token JWT inválido)', async () => {
      const comment_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/forum/comment/${comment_id}`)
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });

    it('> DELETE /forum/comment/:comment_id Não deve remover um comentário (Comentário não encontrado)', async () => {
      const comment_id = 2;
      const response = await request(app.getHttpServer())
        .delete(`/forum/comment/${comment_id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Remover um like', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      await getConnection().createQueryBuilder().insert().into("like_forum").values({ like_forum_id: 1, user_id: 1, forum_id: 1 }).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;

    });

    it('> DELETE /forum/:forum_id/like Deve remover um like', async () => {
      const forum_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/forum/${forum_id}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('> DELETE /forum/:forum_id/like Não deve remover um like (Token JWT inválido)', async () => {
      const forum_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/forum/${forum_id}/like`)
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });

    it('> DELETE /forum/:forum_id/like Não deve remover um like (Forum não encontrado)', async () => {
      const forum_id = 2;
      const response = await request(app.getHttpServer())
        .delete(`/forum/${forum_id}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });
});