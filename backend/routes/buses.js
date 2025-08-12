const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');
const { protect } = require('../middleware/auth');

// @route   GET /api/buses
// @desc    Get all buses
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: buses.length,
      data: buses
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   GET /api/buses/:id
// @desc    Get single bus
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        status: 'error',
        message: 'Bus not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: bus
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   POST /api/buses
// @desc    Create a bus
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const bus = await Bus.create(req.body);

    res.status(201).json({
      status: 'success',
      data: bus
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   PUT /api/buses/:id
// @desc    Update bus
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bus) {
      return res.status(404).json({
        status: 'error',
        message: 'Bus not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: bus
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   DELETE /api/buses/:id
// @desc    Delete bus
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);

    if (!bus) {
      return res.status(404).json({
        status: 'error',
        message: 'Bus not found'
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