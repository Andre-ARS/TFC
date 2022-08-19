import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams'

import teamsList from './mock/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams model', () => {
  describe('Tests the /teams endpoint', async () => { 
    beforeEach(() => {
      sinon.stub(Teams, "findAll").resolves(teamsList as Teams[]);
    });
  
    afterEach(()=>{
      sinon.restore();
    })
  
    it('Returns status 200 when succeeds', async () => {
      const { status, body } = await chai.request(app)
        .get('/teams');
  
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal(teamsList);
    });
  })
});
