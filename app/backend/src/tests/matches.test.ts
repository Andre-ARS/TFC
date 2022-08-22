import { userResponseMock } from './mock/UsersMock';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches'

import { matchesResponseMock, matchesCreateMock } from './mock/matchesMock';
import JwtService from '../services/jwtService';

chai.use(chaiHttp);

const createMatcheBody = {
  homeTeam: 16,
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const { expect } = chai;
describe('Matches model', () => {
  describe('Tests the /matches route', async () => { 
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
      sinon.stub(JwtService, "validateToken").returns({ data: userResponseMock } as any);
      sinon.stub(Matches, "create").resolves(matchesCreateMock as Matches);
      
      const { status, body } = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'any-token')
        .send(createMatcheBody);
  
      expect(status).to.equal(201);
      expect(body).to.be.deep.equal(matchesCreateMock);
    });
    
    it('Allows to finish a matche', async () => {
      sinon.stub(Matches, "update");
      
      const { status, body } = await chai.request(app)
        .patch('/matches/1/finish');
  
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal({ message: 'Finished' });
    });
  })
});
