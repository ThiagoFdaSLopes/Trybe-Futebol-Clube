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

});
