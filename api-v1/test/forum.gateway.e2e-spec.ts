// import { INestApplication, ValidationPipe } from "@nestjs/common";
// import { TestingModule, Test } from "@nestjs/testing";
// import { AppModule } from "../src/app.module";
// import { getConnection } from "typeorm";
// import request from 'supertest';


// describe('Forum Gateway', () => {

//   let app: INestApplication;
//   let token;

//   beforeAll(async () => {

//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     app.useGlobalPipes(new ValidationPipe());
//     await app.init();

//     await getConnection().dropDatabase();
//       await getConnection().synchronize();

//       const forum = {
//         forum_id: 1,
//         forum_img_id: 1,
//         title: 'Primeira vez',
//         no_like: 123123,
//       };
//       const user = {
//         user_id: 1,
//         email: 'carlosboavida@gm.com',
//         user_img_id: 1,
//         user_pass: '123vidaboa',
//         username: 'carlosboaviida',
//         born_in: '2020-06-15'
//       };

//       await getConnection().createQueryBuilder().insert().into("user_img").values({ user_img_id: 1, img_url: "http://localhost:4456" }).execute();
//       await getConnection().createQueryBuilder().insert().into("tb_user").values(user).execute();

//       await getConnection().createQueryBuilder().insert().into("forum_img").values({ forum_img_id: 1, img_url: "http://localhost:4456" }).execute();
//       await getConnection().createQueryBuilder().insert().into('forum').values(forum).execute();

//       const response = await request(app.getHttpServer()).post('/auth/login').send({ email: 'carlosboavida@gm.com', user_pass: '123vidaboa' });
//       token = response.body.token;

//       console.log(token)
//   });

//   afterAll(async () => {
//     await getConnection().close();

//   });

//   describe('Entrar num fórum', () => {
//     it('ForumGateway Test', () => {

//     });
//   });
// });