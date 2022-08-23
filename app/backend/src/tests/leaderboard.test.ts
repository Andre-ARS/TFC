import { userResponseMock } from './mock/UsersMock';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches'

import { homeResponseMock } from './mock/homeBoardMock';
import { awayResponseMock } from './mock/awayBoardMock';

chai.use(chaiHttp);


const { expect } = chai;
describe('Create leaderboard', () => {
  describe('Tests the /leaderboard/home route', async () => { 
    afterEach(()=>{
      sinon.restore();
    })
    
    it('Returns status 200, and a list of the home teams sorted by its points', async () => {
      sinon.stub(Matches, "findAll").resolves(homeResponseMock as Matches[]);

      const { status } = await chai.request(app)
      .get('/leaderboard/home');
      
      expect(status).to.equal(200);
    });
  })

  describe('Tests the /leaderboard/away route', async () => { 
    afterEach(()=>{
      sinon.restore();
    })
    
    it('Returns status 200, and a list of the away teams sorted by its points', async () => {
      sinon.stub(Matches, "findAll").resolves(awayResponseMock as Matches[]);

      const { status } = await chai.request(app)
      .get('/leaderboard/away');
      
      expect(status).to.equal(200);
    });
  })
});
