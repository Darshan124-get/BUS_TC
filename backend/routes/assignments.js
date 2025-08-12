const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const { protect } = require('../middleware/auth');

// @route   GET /api/assignments
// @desc    Get all assignments
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('route', 'routeName routeNumber source destination')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: assignments.length,
      data: assignments
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   GET /api/assignments/:id
// @desc    Get single assignment
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('route', 'routeName routeNumber source destination');

    if (!assignment) {
      return res.status(404).json({
        status: 'error',
        message: 'Assignment not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: assignment
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   POST /api/assignments
// @desc    Create an assignment
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    // Get route details to extract source and destination if not provided
    const Route = require('../models/Route');
    const route = await Route.findById(req.body.route);
    
    if (!route) {
      return res.status(404).json({
        status: 'error',
        message: 'Route not found'
      });
    }
    
    // Use provided source and destination or fallback to route values
    const assignmentData = {
      ...req.body,
      routeName: route.routeName,
      source: req.body.source || route.source || 'N/A',
      destination: req.body.destination || route.destination || 'N/A',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    const assignment = await Assignment.create(assignmentData);

    res.status(201).json({
      status: 'success',
      data: assignment
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   PUT /api/assignments/:id
// @desc    Update assignment
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    // If route is being updated, get the new source and destination
    let updateData = { ...req.body, updatedAt: Date.now() };
    
    if (req.body.route) {
      const Route = require('../models/Route');
      const route = await Route.findById(req.body.route);
      
      if (!route) {
        return res.status(404).json({
          status: 'error',
          message: 'Route not found'
        });
      }
      
      // Use provided source and destination or fallback to route values
      updateData.routeName = route.routeName;
      updateData.source = req.body.source || route.source || 'N/A';
      updateData.destination = req.body.destination || route.destination || 'N/A';
    }
    
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!assignment) {
      return res.status(404).json({
        status: 'error',
        message: 'Assignment not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: assignment
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   DELETE /api/assignments/:id
// @desc    Delete assignment
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        status: 'error',
        message: 'Assignment not found'
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