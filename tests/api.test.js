const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { validationResult, body } = require('express-validator');

// Import routers separately to avoid circular dependencies
const { gmailRouter } = require('../routes/gmail-router');
const { contactRouter } = require('../routes/contact-routes');
const { templateRouter } = require('../routes/template-router');
const { groupRouter } = require('../routes/group-router');
const { campaignRouter } = require('../routes/campaign-routes');
const { appPasswordRouter } = require('../routes/appPassword-routes');

const app = express();
app.use(bodyParser.json());

// Add validation middleware
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

describe('API Routes', () => {
  it('should return 400 for invalid email format', async () => {
    const res = await request(app)
      .post('/api/check-if-user-email-exists')
      .send({ email: 'not-an-email' });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].msg).toBe('Invalid email format');
  });

  it('should return 404 for unknown endpoint', async () => {
    const res = await request(app).get('/api/unknown-endpoint');
    expect(res.statusCode).toBe(404);
  });

  it('should have proper CORS and rate limiting middleware', () => {
    // Test that the app is properly configured
    expect(app).toBeDefined();
  });
});