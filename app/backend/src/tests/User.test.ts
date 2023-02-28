import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from  '../database/models/User'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  // beforeEach(async () => {
  //   sinon
  //     .stub(User, "create")
  //     .resolves({} as User);
  // });

  // afterEach(()=>{
  //   (User.findOne as sinon.SinonStub).restore();
  // })

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

    expect(chaiHttpResponse.status).to.be.deep.equal(400);
  });

  it('Testando o metodo post rota login password invalido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "stringTeste@gmail.com",
        "password": "str"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(400);
  });

});
