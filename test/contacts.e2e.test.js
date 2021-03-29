const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, contacts, newContact } = require('../model/__mocks__/data');
const app = require('../app');

const SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock('../model/contacts.js');
jest.mock('../model/users.js');

describe('Testing the route api/contacts', () => {
  let idNewContact;
  describe('should handle get request', () => {
    it('shuld return 200 status for get all contacts', async done => {
      const res = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
      done();
    });
    it('shuld return 200 status get contact by id', async done => {
      const contact = contacts[0];
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`);
      // console.log(res.body);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact).toHaveProperty('_id');
      expect(res.body.data.contact._id).toBe(contact._id);
      done();
    });
    it('shuld return 404 status by wrong contact id', async done => {
      const wrongContactId = 7878787;
      const res = await request(app)
        .get(`/api/contacts/${wrongContactId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();

      done();
    });
  });

  describe('should handle post request', () => {
    it('shuld return 201 status for add contact', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send(newContact)
        .set('Accept', 'application/json');

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewContact = res.body.data.contact._id;
      done();
    });

    it('shuld return 400 status for wrong field', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();

      done();
    });

    it('shuld return 400 required field name', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Henry' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();

      done();
    });

    it('shuld return 400 required field email', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'test2@test.com' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();

      done();
    });

    it('shuld return 400 required field phone', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ phone: '34443444' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();

      done();
    });
  });

  describe('should handle put request', () => {
    it('shuld return 200 status for update the contact', async done => {
      const res = await request(app)
        .put(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Andrey' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact.name).toBe('Andrey');

      done();
    });

    it('shuld return 400 status for wrong field', async done => {
      const res = await request(app)
        .put(`/api/contacts/${newContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ test: 1 })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();

      done();
    });

    it('shuld return 404 with wrong id ', async done => {
      const res = await request(app)
        .put(`/api/contacts/11111`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Henry' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();

      done();
    });
  });

  describe('should handle putch request', () => {
    // it('shuld return 200 status for update the contact phone', async done => {
    //   const res = await request(app)
    //     .patch(`/api/contacts/${idNewContact}`)
    //     .set('Authorization', `Bearer ${token}`)
    //     .send({ phone: '777777777' })
    //     .set('Accept', 'application/json');

    //   expect(res.status).toEqual(200);
    //   expect(res.body).toBeDefined();
    //   expect(res.body.data.contact.phone).toBe('777777777');

    //   done();
    // });

    it('shuld return 404 with wrong id', async done => {
      const res = await request(app)
        .patch(`/api/contacts/11111`)
        .set('Authorization', `Bearer ${token}`)
        .send({ phone: '00000000' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();

      done();
    });
  });

  describe('should handle delete request', () => {
    it('shuld return 200 status after delete the contact', async done => {
      const contact = contacts[0];
      const res = await request(app)
        .delete(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body).toBeInstanceOf(Object);

      done();
    });

    it('shuld return 404 status not found contact id', async done => {
      const wrongContactId = '12345678';
      const res = await request(app)
        .delete(`/api/contacts/${wrongContactId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();

      done();
    });
  });
});