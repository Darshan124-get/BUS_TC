const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
  stageName: {
    type: String,
    required: [true, 'Please provide a stage name'],
    trim: true,
    maxlength: [255, 'Stage name cannot be more than 255 characters']
  },
  orderIndex: {
    type: Number,
    required: [true, 'Please provide an order index']
  }
});

const RouteSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: [true, 'Please provide a route name'],
    trim: true,
    maxlength: [255, 'Route name cannot be more than 255 characters']
  },
  routeNumber: {
    type: String,
    required: [true, 'Please provide a route number'],
    unique: true,
    trim: true,
    maxlength: [100, 'Route number cannot be more than 100 characters']
  },
  source: {
    type: String,
    trim: true,
    maxlength: [255, 'Source cannot be more than 255 characters']
  },
  destination: {
    type: String,
    trim: true,
    maxlength: [255, 'Destination cannot be more than 255 characters']
  },
  stages: [StageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Route', RouteSchema);