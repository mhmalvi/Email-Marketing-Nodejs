const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { gmailRouter, contactRouter, templateRouter, groupRouter, campaignRouter, appPasswordRouter } = require('../routes/gmail-router');
const { validationResult, body } = require('express-validator');

const app = express();
app.use(bodyParser.json());
app.use(
  '/api',
  [
    body('email').optional().isEmail().withMessage('Invalid email format'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  gmailRouter,
  contactRouter,
  templateRouter,
  groupRouter,
  campaignRouter,
  appPasswordRouter
);

describe('API Route', () => {
  it('should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/some-endpoint')
      .send({ email: 'not-an-email' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('Invalid email format');
  });

  it('should return 404 for unknown endpoint', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toBe(404);
  });
});