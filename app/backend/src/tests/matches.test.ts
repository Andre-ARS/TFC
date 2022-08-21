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
    afterEach(()=>{
      sinon.restore();
    })
    
    it('Returns status 200, and a list of all matches', async () => {
      sinon.stub(Matches, "findAll").resolves(matchesMock as Matches[]);

      const { status, body } = await chai.request(app)
      .get('/matches');
      
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal(matchesMock);
    });

    it('When filtered returns only the matches in progress', async () => {
      const progressMatches = matchesMock.filter(({ inProgress }) => inProgress) 
      sinon.stub(Matches, "findAll").resolves(progressMatches as Matches[]);
      
      const { status, body } = await chai.request(app)
        .get('/matches?inProgress=true');
  
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal(progressMatches);
    });
    
    it('When filtered returns only the finished matches', async () => {
      const finishedMatches = matchesMock.filter(({ inProgress }) => !inProgress) 
      sinon.stub(Matches, "findAll").resolves(finishedMatches as Matches[]);
      
      const { status, body } = await chai.request(app)
        .get('/matches?inProgress=false');
  
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal(finishedMatches);
    });
  })
});
