import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { ITeam } from '../interfaces/ITeam'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves({
        id: 10,
        teamName: "SPFC"
      } as Team);
  });

  afterEach(()=>{
    (Team.findOne as sinon.SinonStub).restore();
  })

  it('Testando o metodo get da rota teams', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams')

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

});
