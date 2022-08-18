import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users'

import { userResponseMock } from './mock/UsersMock';
import { PasswordService } from '../services';
import JwtService from '../services/jwtService';

chai.use(chaiHttp);

const { expect } = chai;

const loginUser = {
  email: 'any-email',
  password: 'any-password',
};

describe('Users model', () => {
  describe('Tests the Login', async () => { 
    beforeEach(() => {
      sinon.stub(Users, "findOne").resolves(userResponseMock as Users);
      sinon.stub(PasswordService, "checkPassword");
    });
  
    afterEach(()=>{
      sinon.restore();
    })
  
    it('Returns status 200 when succeeds', async () => {
      const res = await chai.request(app)
        .post('/login').send(loginUser);
  
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });
  
    // it('Seu sub-teste', () => {
    //   expect(false).to.be.eq(true);
    // });
  })
});
