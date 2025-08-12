const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: [true, 'Please provide a vehicle number'],
    trim: true,
    maxlength: [100, 'Vehicle number cannot be more than 100 characters']
  },
  routeName: {
    type: String,
    trim: true,
    maxlength: [100, 'Route name cannot be more than 100 characters']
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: [true, 'Please provide a route']
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
  assignDate: {
    type: Date,
    required: [true, 'Please provide an assignment date']
  },
  departureTime: {
    type: String,
    required: [true, 'Please provide a departure time']
  },
  __v: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);