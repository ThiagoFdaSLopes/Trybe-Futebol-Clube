import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste User', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  // beforeEach(async () => {
  //   sinon
  //     .stub(User, "create")
  //     .resolves({} as User);
  // });

  afterEach(()=>{
    sinon.restore();
  })

  it('Testando o metodo post rota login email vazio', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "",
        "password": "stringTeste"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(400);
  });

  it('Testando o metodo post rota login usuario invalido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "stringTeste@gmail.com",
        "password": "stringTeste"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

  it('Testando o metodo post rota login email invalido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "stringTeste",
        "password": "stringTeste"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

  it('Testando o metodo post rota login password invalido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "stringTeste@gmail.com",
        "password": "str"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

  it('Testando o metodo post rota login user valido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "admin@admin.com",
        "password": "secret_admin"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Testando o metodo post rota login user invalido 2', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "admin@admin.com",
        "password": "secret_admi"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

  it('Testando o metodo get rota login/role', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/login/role').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Testando o metodo get rota login/role', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/login/role').set('authorization', 'eyJhbGciOiJII1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI');

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

  it('Testando o metodo get rota login/role', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/login/role')

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

});
