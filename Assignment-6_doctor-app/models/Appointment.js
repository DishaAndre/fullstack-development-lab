// models/Appointment.js
// This file defines the structure of our Appointment data in MongoDB

const mongoose = require('mongoose');

// Define the schema (structure) for an appointment
const appointmentSchema = new mongoose.Schema({
  // Patient's full name
  name: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true  // removes extra spaces
  },

  // Name of the doctor chosen
  doctor: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },

  // Appointment date
  date: {
    type: String,
    required: [true, 'Date is required']
  },

  // Appointment time slot
  time: {
    type: String,
    required: [true, 'Time is required']
  },

  // Automatically store when the appointment was created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
// mongoose.model('Appointment', schema) creates a 'appointments' collection in MongoDB
module.exports = mongoose.model('Appointment', appointmentSchema);
