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

const validLoginUser = {
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
      const { status, body } = await chai.request(app)
        .post('/login').send(validLoginUser);
  
      expect(status).to.equal(200);
      expect(body).to.have.property('token');
    });
  
    it("Returns status 400 if there's no email", async () => {
      const { status, body } = await chai.request(app)
        .post('/login').send(validLoginUser.password);
      
      expect(status).to.equal(400);
      expect(body.message).to.be.equal('All fields must be filled');
    });

    it("Returns status 400 if there's no password", async () => {
      const { status, body } = await chai.request(app)
        .post('/login').send(validLoginUser.email);
      
      expect(status).to.equal(400);
      expect(body.message).to.be.equal('All fields must be filled');
    });
  })
});
