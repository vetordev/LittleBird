import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { getConnection } from "typeorm";
import request from 'supertest';

describe('Theme', () => {
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

  describe("Buscar temas", () => {
    beforeAll(async () => {

      await getConnection().dropDatabase()
      await getConnection().synchronize();

      await getConnection().createQueryBuilder().insert().into("theme_img").values({ theme_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("theme").values({ theme_id: 1, theme_name: "Sexo", theme_img_id: 1 }).execute();

      await getConnection().createQueryBuilder().insert().into("theme_img").values({ theme_img_id: 2, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("theme").values({ theme_id: 2, theme_name: "Casamento", theme_img_id: 2 }).execute();

    });

    it('> GET /theme Deve retornar todos os temas', async () => {
      const response = await request(app.getHttpServer())
        .get('/theme?page=1');

      expect(response.status).toBe(200);
      expect(response.header['x-total-count']).toBe("2");
      expect(response.body[0]).toEqual(expect.objectContaining({
        theme_id: expect.any(Number),
        theme_name: expect.any(String),
        theme_img_id: {
          theme_img_id: expect.any(Number),
          img_url: expect.any(String)
        }
      }));
    });
  });
});