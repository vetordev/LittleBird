import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { getConnection } from "typeorm";
import * as request from 'supertest';


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

    await app.close();
  });

  describe("Buscar temas", () => {
    beforeAll(async () => {
      //Deletando todos os dados da tabela
      await getConnection().getRepository("theme").clear();
      await getConnection().getRepository("theme_img").clear();

      await getConnection().createQueryBuilder().insert().into("theme_img").values({ theme_img_id: 1, img_url: "http://localhost:4456" }).execute();
      await getConnection().createQueryBuilder().insert().into("theme").values({ theme_id: 1, theme_name: "Sexo", theme_img_id: 1 }).execute();

    });

    it('> GET /theme Deve retornar todos os temas', async () => {
      const response = await request(app.getHttpServer())
        .get('/theme');

      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefined();
      expect(response.body[0]).toHaveProperty('theme_img_id')

      // TODO Resolver o toMatchObject
      // expect(response.body[0]).toMatchObject(new GetThemeDto());
    });

  });

});