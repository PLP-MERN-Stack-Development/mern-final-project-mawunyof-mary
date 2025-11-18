const bugController = require('../../src/controllers/bugController');
const Bug = require('../../src/models/Bug');

jest.mock('../../src/models/Bug');

describe('Bug Controller - Unit Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('createBug', () => {
    test('should create a bug with valid data', async () => {
      req.body = {
        title: 'Login button not working',
        description: 'The login button on the homepage is not responding to clicks',
        severity: 'high',
        reportedBy: 'john@example.com'
      };

      const mockBug = {
        _id: '123',
        ...req.body,
        status: 'open',
        createdAt: new Date()
      };

      Bug.create.mockResolvedValue(mockBug);

      await bugController.createBug(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockBug,
        message: 'Bug created successfully'
      });
    });

    test('should fail with missing required fields', async () => {
      req.body = { title: 'Missing description' };

      await bugController.createBug(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });

    test('should fail with short description', async () => {
      req.body = {
        title: 'Bug',
        description: 'Short',
        reportedBy: 'user@test.com'
      };

      await bugController.createBug(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test('should use default severity if not provided', async () => {
      req.body = {
        title: 'Valid Title',
        description: 'This is a valid description for testing',
        reportedBy: 'user@test.com'
      };

      const mockBug = { ...req.body, severity: 'medium', _id: '123' };
      Bug.create.mockResolvedValue(mockBug);

      await bugController.createBug(req, res, next);

      expect(Bug.create).toHaveBeenCalledWith(
        expect.objectContaining({ severity: 'medium' })
      );
    });
  });

  describe('getAllBugs', () => {
    test('should return all bugs', async () => {
      const mockBugs = [
        { _id: '1', title: 'Bug 1', status: 'open' },
        { _id: '2', title: 'Bug 2', status: 'resolved' }
      ];

      Bug.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockBugs)
      });

      req.query = {};

      await bugController.getAllBugs(req, res, next);

      expect(res.json).toHaveBeenCalled();
      const callArgs = res.json.mock.calls[0][0];
      expect(callArgs.success).toBe(true);
      expect(callArgs.count).toBe(2);
    });

    test('should filter bugs by status', async () => {
      req.query = { status: 'open' };
      const mockBugs = [{ _id: '1', title: 'Bug 1', status: 'open' }];

      Bug.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockBugs)
      });

      await bugController.getAllBugs(req, res, next);

      expect(Bug.find).toHaveBeenCalledWith({ status: 'open' });
      const callArgs = res.json.mock.calls[0][0];
      expect(callArgs.count).toBe(1);
    });

    test('should return empty list if no bugs found', async () => {
      Bug.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([])
      });

      req.query = {};

      await bugController.getAllBugs(req, res, next);

      const callArgs = res.json.mock.calls[0][0];
      expect(callArgs.success).toBe(true);
      expect(callArgs.count).toBe(0);
    });
  });

  describe('getBugById', () => {
    test('should get bug by ID', async () => {
      req.params = { id: '123' };
      const mockBug = { _id: '123', title: 'Bug 1', status: 'open' };

      Bug.findById.mockResolvedValue(mockBug);

      await bugController.getBugById(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockBug
      });
    });

    test('should return 404 if bug not found', async () => {
      req.params = { id: '999' };
      Bug.findById.mockResolvedValue(null);

      await bugController.getBugById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('updateBug', () => {
    test('should update bug status', async () => {
      req.params = { id: '123' };
      req.body = { status: 'in-progress' };

      const mockBug = {
        _id: '123',
        title: 'Bug',
        status: 'open',
        save: jest.fn().mockResolvedValue(true)
      };

      Bug.findById.mockResolvedValue(mockBug);

      await bugController.updateBug(req, res, next);

      expect(mockBug.status).toBe('in-progress');
      expect(mockBug.save).toHaveBeenCalled();
    });

    test('should return 404 if bug not found', async () => {
      req.params = { id: '999' };
      req.body = { status: 'resolved' };
      Bug.findById.mockResolvedValue(null);

      await bugController.updateBug(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteBug', () => {
    test('should delete bug successfully', async () => {
      req.params = { id: '123' };
      Bug.findByIdAndDelete.mockResolvedValue({ _id: '123' });

      await bugController.deleteBug(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Bug deleted successfully'
      });
    });

    test('should return 404 if bug not found', async () => {
      req.params = { id: '999' };
      Bug.findByIdAndDelete.mockResolvedValue(null);

      await bugController.deleteBug(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
