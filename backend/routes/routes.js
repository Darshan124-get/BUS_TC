const express = require('express');
const router = express.Router();
const Route = require('../models/Route');
const { protect } = require('../middleware/auth');

// @route   GET /api/routes
// @desc    Get all routes
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const routes = await Route.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: routes.length,
      data: routes
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   GET /api/routes/:id
// @desc    Get single route
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({
        status: 'error',
        message: 'Route not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: route
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   GET /api/routes/:id/stages
// @desc    Get stages for a route
// @access  Private
router.get('/:id/stages', protect, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({
        status: 'error',
        message: 'Route not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: route.stages
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   POST /api/routes
// @desc    Create a route
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const route = await Route.create(req.body);

    res.status(201).json({
      status: 'success',
      data: route
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   PUT /api/routes/:id
// @desc    Update route
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!route) {
      return res.status(404).json({
        status: 'error',
        message: 'Route not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: route
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   DELETE /api/routes/:id
// @desc    Delete route
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);

    if (!route) {
      return res.status(404).json({
        status: 'error',
        message: 'Route not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

module.exports = router;