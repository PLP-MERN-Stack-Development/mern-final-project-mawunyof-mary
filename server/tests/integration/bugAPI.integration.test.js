const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Bug = require('../../src/models/Bug');

describe('Bug API Integration Tests', () => {
  let bugId;

  beforeAll(async () => {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bug-tracker-test');
    }

    await Bug.deleteMany({});

    const testBug = await Bug.create({
      title: 'Test Bug',
      description: 'This is a test bug',
      severity: 'high',
      priority: 2,
      status: 'open'
    });
    bugId = testBug._id;
  });

  afterAll(async () => {
    await Bug.deleteMany({});

    return new Promise((resolve) => {
      setTimeout(() => {
        if (mongoose.connection.readyState === 1) {
          mongoose.connection.close();
        }
        resolve();
      }, 500);
    });
  });

  describe('GET /api/bugs', () => {
    test('should return bugs endpoint response', async () => {
      const response = await request(app)
        .get('/api/bugs')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(Array.isArray(response.body.data)).toBe(true);
    }, 10000);

    test('should filter bugs by status', async () => {
      const response = await request(app)
        .get('/api/bugs?status=open')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('should sort bugs by recent', async () => {
      const response = await request(app)
        .get('/api/bugs?sortBy=recent')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('GET /api/bugs/:id', () => {
    test('should return a single bug by ID', async () => {
      const response = await request(app)
        .get(`/api/bugs/${bugId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(bugId.toString());
    });

    test('should return 404 for non-existent bug ID', async () => {
      const validId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/bugs/${validId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid bug ID format', async () => {
      const response = await request(app)
        .get('/api/bugs/invalid-id')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid bug ID format');
    });

    test('should handle missing required fields on POST', async () => {
      const response = await request(app)
        .post('/api/bugs')
        .send({
          description: 'Missing title'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should validate bug data on creation', async () => {
      const response = await request(app)
        .post('/api/bugs')
        .send({
          title: 'Valid Bug',
          description: 'Valid description',
          severity: 'high',
          priority: 1
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Valid Bug');
    });
  });

  describe('POST /api/bugs', () => {
    test('should create a new bug', async () => {
      const response = await request(app)
        .post('/api/bugs')
        .send({
          title: 'New Bug',
          description: 'New bug description',
          severity: 'medium',
          priority: 2,
          status: 'open'
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('New Bug');
    });
  });

  describe('PUT /api/bugs/:id', () => {
    test('should update an existing bug', async () => {
      const response = await request(app)
        .put(`/api/bugs/${bugId}`)
        .send({
          status: 'closed'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('closed');
    });

    test('should return 400 for invalid ID on update', async () => {
      const response = await request(app)
        .put('/api/bugs/invalid-id')
        .send({ status: 'closed' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    test('should delete a bug', async () => {
      const testBug = await Bug.create({
        title: 'Bug to Delete',
        description: 'This will be deleted',
        severity: 'low',
        priority: 3,
        status: 'open'
      });

      const response = await request(app)
        .delete(`/api/bugs/${testBug._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      const deleted = await Bug.findById(testBug._id);
      expect(deleted).toBeNull();
    });

    test('should return 400 for invalid ID on delete', async () => {
      const response = await request(app)
        .delete('/api/bugs/invalid-id')
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});