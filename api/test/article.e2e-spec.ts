import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { getConnection, Repository } from "typeorm";
import request from 'supertest';

describe('Article', () => {
  let app: INestApplication;
  let token;

  const article = {
    article_id: 1,
    article_img_id: 1,
    title: 'Sexo adolescente',
    article_content: '.....',
    no_like: 123123,
    publi_date: '2020-12-30',
    article_author: 'Carlos'
  };
  const recommendation = {
    recommendation_id: 1,
    recommendation_url: 'http://localhost',
    recommendation_type: 'Podcast',
    title: 'Conversa',
    article_id: 1
  };
  const user = {
    user_id: 1,
    email: 'carlosboavida@gm.com',
    user_img_id: 1,
    user_pass: '7f69c888bd3d61f20070fae8781a6b355c549b92e76e2955818eb75563a61b15',
    username: 'carlosboaviida',
    born_in: '2020-06-15'
  };
  const forum = {
    forum_id: 1,
    forum_img_id: 1,
    title: 'Primeira vez',
    no_like: 123123,
    forum_description: 'Lorem ipsum dolor sit amet',
    publi_date: '2020-01-01'
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




  describe('Buscar um artigo', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("theme_img").values({ theme_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("theme").values({ theme_id: 1, theme_name: "Sexo", theme_img_id: 1 }).execute();

      await getConnection().createQueryBuilder().insert().into("theme_img").values({ theme_img_id: 2, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("theme").values({ theme_id: 2, theme_name: "Casamento", theme_img_id: 2 }).execute();

      await getConnection().createQueryBuilder().insert().into("article_img").values({ article_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('article').values(article).execute();

      await getConnection().createQueryBuilder().insert().into('recommendation_article').values(recommendation).execute();

      await getConnection().createQueryBuilder().insert().into("theme_article").values({ theme_article_id: 1, theme_id: 1, article_id: 1 }).execute();
      await getConnection().createQueryBuilder().insert().into("theme_article").values({ theme_article_id: 2, theme_id: 2, article_id: 1 }).execute();

    });


    it('> GET /article/:article_id Buscar um artigo', async () => {

      const article_id = 1;
      const response = await request(app.getHttpServer())
        .get(`/article/${article_id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        article: {
          article_id: expect.any(Number),
          article_img_id: {
            article_img_id: expect.any(Number),
            img_url: expect.any(String)
          },
          title: expect.any(String),
          article_content: expect.any(String),
          no_like: expect.any(Number),
          publi_date: expect.any(String),
          article_author: expect.any(String)
        },
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
        recommendations: [
          {
            recommendation_id: expect.any(Number),
            recommendation_url: expect.any(String),
            recommendation_type: expect.any(String),
            title: expect.any(String)
          }
        ]
      }));

    });
    it('> GET /article/:article_id Não deve buscar um artigo (Artigo não encontrado)', async () => {

      const article_id = 2;
      const response = await request(app.getHttpServer())
        .get(`/article/${article_id}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });

  });

  describe('Buscar artigos', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      const article2 = {
        article_id: 2,
        article_img_id: 2,
        title: 'Sexo adolescente',
        article_content: '.....',
        no_like: 2,
        publi_date: '2020-01-02',
        article_author: 'Carlos'
      };

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("theme_img").values({ theme_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("theme").values({ theme_id: 1, theme_name: "Sexo", theme_img_id: 1 }).execute();

      await getConnection().createQueryBuilder().insert().into("article_img").values({ article_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('article').values(article).execute();

      await getConnection().createQueryBuilder().insert().into("article_img").values({ article_img_id: 2, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('article').values(article2).execute();

      await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

      await getConnection().createQueryBuilder().insert().into("theme_article").values({ theme_article_id: 1, theme_id: 1, article_id: 1 }).execute();
      await getConnection().createQueryBuilder().insert().into("theme_article").values({ theme_article_id: 2, theme_id: 1, article_id: 2 }).execute();

      await getConnection().createQueryBuilder().insert().into("like_article").values({ like_article_id: 1, user_id: 1, article_id: 1 }).execute();

      await getConnection().createQueryBuilder().insert().into("later_article").values({ later_article_id: 1, user_id: 1, article_id: 1 }).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;

    });

    it('> GET /article/user/like Deve retornar os artigos com o like do usuário', async () => {

      const response = await request(app.getHttpServer())
        .get('/article/user/like?page=1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.header['x-total-count']).toBe("1");
      expect(response.body[0]).toEqual(expect.objectContaining({
        article_id: {
          article_id: expect.any(Number),
          article_img_id: {
            article_img_id: expect.any(Number),
            img_url: expect.any(String)
          },
          title: expect.any(String),
          no_like: expect.any(Number),
          publi_date: expect.any(String),
        },
      }));

    });
    it('> GET /article/user/like Não deve retornar os artigos com o like do usuário (Token JWT inválido)', async () => {
      const response = await request(app.getHttpServer())
        .get('/article/user/like?page=1')
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });

    it('> GET /article/user/later Deve retornar os artigos que o usuário marcou com ler mais tarde', async () => {
      const response = await request(app.getHttpServer())
        .get('/article/user/later?page=1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.header['x-total-count']).toBe("1");
      expect(response.body[0]).toEqual(expect.objectContaining({
        article_id: {
          article_id: expect.any(Number),
          article_img_id: {
            article_img_id: expect.any(Number),
            img_url: expect.any(String)
          },
          title: expect.any(String),
          no_like: expect.any(Number),
          publi_date: expect.any(String),
        },
      }));
    });

    it('> GET /article/user/later Não deve retornar os artigos que o usuário marcou com ler mais tarde (token JWT inválido)', async () => {
      const response = await request(app.getHttpServer())
        .get('/article/user/later?page=1')
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });

    it('> GET /article/theme/:theme_id/like Deve retornar os artigos de um tema ordenados pelo like', async () => {
      const theme_id = 1;
      const response = await request(app.getHttpServer())
        .get(`/article/theme/${theme_id}/like?page=1`);

      expect(response.status).toBe(200);
      expect(response.header['x-total-count']).toBe("1");
      expect(response.body[0]).toEqual(expect.objectContaining({

        article_id: expect.any(Number),
        article_img_id: {
          article_img_id: expect.any(Number),
          img_url: expect.any(String)
        },
        title: expect.any(String),
        no_like: expect.any(Number),
        publi_date: expect.any(String),

      }));

    });
    it('> GET /article/theme/:theme_id/like Não deve retornar os artigos de um tema ordenados pelo like (Tema não encontrado)', async () => {
      const theme_id = 2;
      const response = await request(app.getHttpServer())
        .get(`/article/theme/${theme_id}/like?page=1`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });

    it('> GET /article Deve retornar os artigos ordenados pelo like', async () => {
      const response = await request(app.getHttpServer())
        .get('/article?page=1');

      expect(response.status).toBe(200);
      expect(response.header['x-total-count']).toBe("1");
      expect(response.body[0]).toEqual(expect.objectContaining({
          article_id: expect.any(Number),
          article_img_id: {
            article_img_id: expect.any(Number),
            img_url: expect.any(String),
          },
          title: expect.any(String),
          no_like: expect.any(Number),
          publi_date: expect.any(String),
      }));
    });

    it('> GET /article/forum Deve retornar artigos e foruns', async () => {
      const response = await request(app.getHttpServer())
        .get(`/article/forum/date?page=1`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining([
          {
            article_id: expect.any(Number),
            article_img_id: {
              article_img_id: expect.any(Number),
              img_url: expect.any(String),
            },
            title: expect.any(String),
            no_like: expect.any(Number),
            publi_date: expect.any(String),
          },
          {
            article_id: expect.any(Number),
            article_img_id: {
              article_img_id: expect.any(Number),
              img_url: expect.any(String),
            },
            title: expect.any(String),
            no_like: expect.any(Number),
            publi_date: expect.any(String),
          },
          {
            forum_id: expect.any(Number),
            title: expect.any(String),
            no_like: expect.any(Number),
            forum_img_id: {
              forum_img_id: expect.any(Number),
              img_url: expect.any(String)
            },
            publi_date: expect.any(String),
          }
      ]));
    });
  });

  describe('Registrar um Like', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("article_img").values({ article_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('article').values(article).execute();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;
    });

    it('> POST /article/:article_id/like Deve registrar um like', async () => {
      const article_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/article/${article_id}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);

    });
    it('> POST /article/:article_id/like Não deve registrar um like (Token JWT inválido)', async () => {
      const article_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/article/${article_id}/like`)
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });
    it('> POST /article/:article_id/like Não deve registrar um like (Artigo não encontrado)', async () => {
      const article_id = 2;
      const response = await request(app.getHttpServer())
        .post(`/article/${article_id}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Registrar um Later', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("article_img").values({ article_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('article').values(article).execute();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;

    });

    it('> POST /article/:article_id/later Deve registrar um ler mais tarde', async () => {
      const article_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/article/${article_id}/later`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);

    });
    it('> POST /article/:article_id/like Não deve registrar um ler mais tarde (Token JWT inválido)', async () => {
      const article_id = 1;
      const response = await request(app.getHttpServer())
        .post(`/article/${article_id}/later`)
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });
    it('> POST /article/:article_id/like Não deve registrar um ler mais tarde (Artigo não encontrado)', async () => {
      const article_id = 2;
      const response = await request(app.getHttpServer())
        .post(`/article/${article_id}/later`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Remover um Like', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("article_img").values({ article_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('article').values(article).execute();

      await getConnection().createQueryBuilder().insert().into("like_article").values({ like_article_id: 1, user_id: 1, article_id: 1 }).execute();



      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;

    });

    it('> POST /article/:article_id/like Deve remover um like', async () => {
      const article_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/article/${article_id}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
    it('> POST /article/:article_id/like Não deve remover um like (Token JWT inválido)', async () => {
      const article_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/article/${article_id}/like`)
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });
    it('> POST /article/:article_id/like Não deve remover um like (Artigo não encontrado)', async () => {
      const article_id = 2;
      const response = await request(app.getHttpServer())
        .delete(`/article/${article_id}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Remover um Later', () => {

    beforeAll(async () => {
      await getConnection().dropDatabase();
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

      await getConnection().createQueryBuilder().insert().into("article_img").values({ article_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into('article').values(article).execute();

      await getConnection().createQueryBuilder().insert().into("later_article").values({ later_article_id: 1, user_id: 1, article_id: 1 }).execute();

      const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
      token = response.body.token;

    });

    it('> POST /article/:article_id/later Deve remover um ler mais tarde', async () => {
      const article_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/article/${article_id}/later`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('> POST /article/:article_id/later Não deve remover um ler mais tarde (Token JWT inválidO)', async () => {
      const article_id = 1;
      const response = await request(app.getHttpServer())
        .delete(`/article/${article_id}/later`)
        .set('Authorization', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
    });

    it('> POST /article/:article_id/later Não deve remover um ler mais tarde (Artigo não encontrado)', async () => {
      const article_id = 2;
      const response = await request(app.getHttpServer())
        .delete(`/article/${article_id}/later`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });
});