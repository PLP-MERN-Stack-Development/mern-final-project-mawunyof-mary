const Bug = require('../models/Bug');

exports.getAllBugs = async (req, res, next) => {
  try {
    const { status, priority, sortBy } = req.query;
    let query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;

    let bugs = Bug.find(query);

    if (sortBy === 'recent') {
      bugs = bugs.sort({ createdAt: -1 });
    } else if (sortBy === 'priority') {
      bugs = bugs.sort({ priority: -1 });
    }

    const result = await bugs;
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.getBugById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bug ID format'
      });
    }

    const bug = await Bug.findById(id);

    if (!bug) {
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }

    res.json({ success: true, data: bug });
  } catch (err) {
    next(err);
  }
};

exports.createBug = async (req, res, next) => {
  try {
    const { title, description, severity, priority, status } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const bug = new Bug({
      title,
      description,
      severity,
      priority,
      status: status || 'open'
    });

    await bug.save();
    res.status(201).json({ success: true, data: bug });
  } catch (err) {
    next(err);
  }
};

exports.updateBug = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bug ID format'
      });
    }

    const bug = await Bug.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bug) {
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }

    res.json({ success: true, data: bug });
  } catch (err) {
    next(err);
  }
};

exports.deleteBug = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bug ID format'
      });
    }

    const bug = await Bug.findByIdAndDelete(id);

    if (!bug) {
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }

    res.json({ success: true, message: 'Bug deleted', data: bug });
  } catch (err) {
    next(err);
  }
};

exports.getBugStats = async (req, res, next) => {
  try {
    const stats = await Bug.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};
