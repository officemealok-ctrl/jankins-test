const request = require('supertest');
const app = require('../src/app');

describe('Jenkins Docker Pipeline Test App Endpoints', () => {
  it('GET / should return 200 OK and Pro Harmonium web interface', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('PRO HARMONIUM');
    expect(res.text).toContain('Authentic Indian Classical Virtual Harmonium');
  });

  it('GET /api/health should return 200 OK and status UP', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'UP');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('timestamp');
  });

  it('GET /api/info should return app details and Jenkins URL', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('appName', 'jenkins-docker-test-app');
    expect(res.body.repository).toEqual('https://github.com/officemealok-ctrl/jankins-test');
    expect(res.body.jenkinsUrl).toEqual('http://35.154.117.52:8080/');
  });
});
