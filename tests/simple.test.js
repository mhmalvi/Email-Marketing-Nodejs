const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Simple test without database setup
describe('Basic Application Tests', () => {
  it('should create express app', () => {
    const app = express();
    app.use(bodyParser.json());
    
    expect(app).toBeDefined();
  });

  it('should handle basic middleware', () => {
    const app = express();
    app.use(bodyParser.json());
    
    app.get('/test', (req, res) => {
      res.json({ message: 'test' });
    });

    return request(app)
      .get('/test')
      .expect(200)
      .then(response => {
        expect(response.body.message).toBe('test');
      });
  });

  it('should validate basic environment variables', () => {
    // Test that we can access environment variables
    expect(process.env.NODE_ENV).toBe('test');
  });
});