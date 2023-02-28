import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste Matches', () => {
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

  it('Testando o metodo get rota matches', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Testando o metodo get rota matches inProgress === true', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Testando o metodo get rota matches inProgress === false', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Testando o metodo patch rota matches para finalizar matche', async () => {
    chaiHttpResponse = await chai
       .request(app).patch('/matches/12/finish').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Testando o metodo patch rota matches para finalizar matche token invalido', async () => {
    chaiHttpResponse = await chai
       .request(app).patch('/matches/12/finish')
        .set('authorization', 'ebGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI')
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        });

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

  it('Testando o metodo patch rota matches para editar matche', async () => {
    chaiHttpResponse = await chai
       .request(app).patch('/matches/12')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI')
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        });

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Testando o metodo patch rota matches para criar matche id nao existe', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/matches')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI')
        .send({
          "homeTeamId": 12,
          "awayTeamId": 6465654,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        });

    expect(chaiHttpResponse.status).to.be.deep.equal(404);
  });

  it('Testando o metodo patch rota matches para criar matche id iguais', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/matches')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI')
        .send({
          "homeTeamId": 12,
          "awayTeamId": 12,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        });

    expect(chaiHttpResponse.status).to.be.deep.equal(422);
  });

  it('Testando o metodo patch rota matches para criar matche valida', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/matches')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI')
        .send({
          "homeTeamId": 12,
          "awayTeamId": 13,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        });

    expect(chaiHttpResponse.status).to.be.deep.equal(201);
  });

});
