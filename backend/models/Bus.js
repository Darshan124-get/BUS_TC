const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a bus name'],
    trim: true,
    maxlength: [255, 'Name cannot be more than 255 characters']
  },
  vehicleNumber: {
    type: String,
    required: [true, 'Please provide a vehicle number'],
    unique: true,
    trim: true,
    maxlength: [100, 'Vehicle number cannot be more than 100 characters']
  },
  routeName: {
    type: String,
    trim: true,
    maxlength: [255, 'Route name cannot be more than 255 characters']
  },
  routeNumber: {
    type: String,
    trim: true,
    maxlength: [100, 'Route number cannot be more than 100 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bus', BusSchema);