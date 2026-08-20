const express = require('express');
const app = express();

app.use(express.json());

// Root endpoint: HTML dashboard page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Jenkins Docker Pipeline Test App</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Inter', sans-serif;
          background: #0f172a;
          color: #f8fafc;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .card {
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }
        .badge {
          display: inline-block;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 6px 14px;
          border-radius: 9999px;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .status-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .status-item {
          background: #0f172a;
          padding: 16px;
          border-radius: 10px;
          border: 1px solid #334155;
        }
        .status-label {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 600;
        }
        .status-value {
          font-size: 1rem;
          font-weight: 600;
          color: #e2e8f0;
          margin-top: 4px;
        }
        .api-links {
          display: flex;
          gap: 12px;
        }
        .btn {
          flex: 1;
          display: inline-block;
          text-align: center;
          padding: 12px;
          background: #3b82f6;
          color: #ffffff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }
        .btn-outline {
          background: transparent;
          border: 1px solid #475569;
          color: #cbd5e1;
        }
        .btn-outline:hover {
          background: #1e293b;
          border-color: #64748b;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">● Pipeline Status: Active</span>
        <h1>Jenkins & Docker Pipeline</h1>
        <p>This is a lightweight application designed to test continuous integration and delivery with Jenkins and Docker.</p>
        
        <div class="status-grid">
          <div class="status-item">
            <div class="status-label">Environment</div>
            <div class="status-value">Docker Container</div>
          </div>
          <div class="status-item">
            <div class="status-label">Node Version</div>
            <div class="status-value">${process.version}</div>
          </div>
          <div class="status-item">
            <div class="status-label">Uptime</div>
            <div class="status-value">${Math.floor(process.uptime())}s</div>
          </div>
          <div class="status-item">
            <div class="status-label">Health</div>
            <div class="status-value" style="color:#10b981;">100% OK</div>
          </div>
        </div>

        <div class="api-links">
          <a href="/api/health" class="btn">Health Endpoint</a>
          <a href="/api/info" class="btn btn-outline">System Info</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Jenkins Docker Test App is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Information endpoint
app.get('/api/info', (req, res) => {
  res.status(200).json({
    appName: 'jenkins-docker-test-app',
    version: '1.0.0',
    repository: 'https://github.com/officemealok-ctrl/jankins-test',
    jenkinsUrl: 'http://35.154.117.52:8080/',
    environment: process.env.NODE_ENV || 'development'
  });
});

module.exports = app;
