import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches'

import matchesMock from './mock/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches model', () => {
  describe('Tests the /matches endpoint', async () => { 
    beforeEach(() => {
      sinon.stub(Matches, "findAll").resolves(matchesMock as Matches[]);
    });
  
    afterEach(()=>{
      sinon.restore();
    })
  
    it('Returns status 200, and a list of all matches', async () => {
      const { status, body } = await chai.request(app)
        .get('/matches');
  
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal(matchesMock);
    });
  })
});
