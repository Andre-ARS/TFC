import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches'

import { matchesResponseMock, matchesCreateMock } from './mock/matchesMock';

chai.use(chaiHttp);

const createMatcheBody = {
  homeTeam: 16,
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const { expect } = chai;
describe('Matches model', () => {
  describe('Tests the /matches endpoint', async () => { 
    afterEach(()=>{
      sinon.restore();
    })
    
    it('Returns status 200, and a list of all matches', async () => {
      sinon.stub(Matches, "findAll").resolves(matchesResponseMock as Matches[]);

      const { status, body } = await chai.request(app)
      .get('/matches');
      
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal(matchesResponseMock);
    });

    it('When filtered returns only the matches in progress', async () => {
      const progressMatches = matchesResponseMock.filter(({ inProgress }) => inProgress) 
      sinon.stub(Matches, "findAll").resolves(progressMatches as Matches[]);
      
      const { status, body } = await chai.request(app)
        .get('/matches?inProgress=true');
  
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal(progressMatches);
    });
    
    it('When filtered returns only the finished matches', async () => {
      const finishedMatches = matchesResponseMock.filter(({ inProgress }) => !inProgress) 
      sinon.stub(Matches, "findAll").resolves(finishedMatches as Matches[]);
      
      const { status, body } = await chai.request(app)
        .get('/matches?inProgress=false');
  
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal(finishedMatches);
    });
    
    it('Allows to create a new matche', async () => {
      sinon.stub(Matches, "create").resolves(matchesCreateMock as Matches);
      
      const { status, body } = await chai.request(app)
        .post('/matches').send(createMatcheBody);
  
      expect(status).to.equal(201);
      expect(body).to.be.deep.equal(matchesCreateMock);
    });
  })
});
