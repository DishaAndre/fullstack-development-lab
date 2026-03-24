// app.js
// Main entry point of our Doctor Appointment Booking application

// ─── 1. Import required packages ─────────────────────────────────────────────
const express  = require('express');       // Web framework
const mongoose = require('mongoose');      // MongoDB object modeling
const path     = require('path');          // Node built-in for file paths

// Import our Appointment model
const Appointment = require('./models/Appointment');

// ─── 2. App configuration ─────────────────────────────────────────────────────
const app  = express();
const PORT = 3000;

// Set EJS as the templating engine (for rendering HTML pages)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware: parse form data sent via POST requests
app.use(express.urlencoded({ extended: true }));

// Middleware: serve static files (CSS, images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// ─── 3. Connect to MongoDB ────────────────────────────────────────────────────
// Make sure MongoDB is running locally before starting the app
mongoose
  .connect('mongodb://127.0.0.1:27017/doctorAppointments')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ─── 4. Static doctor data (no DB needed for this) ───────────────────────────
// In a real app these would come from a database, but for simplicity we keep them here
const doctors = [
  { name: 'Dr. Priya Sharma',    specialty: 'General Physician',  available: 'Mon – Fri' },
  { name: 'Dr. Rahul Mehta',     specialty: 'Cardiologist',        available: 'Mon, Wed, Fri' },
  { name: 'Dr. Anjali Desai',    specialty: 'Dermatologist',       available: 'Tue, Thu, Sat' },
  { name: 'Dr. Suresh Patil',    specialty: 'Orthopedic Surgeon',  available: 'Mon – Sat' },
  { name: 'Dr. Kavitha Nair',    specialty: 'Pediatrician',        available: 'Mon – Fri' },
  { name: 'Dr. Vikram Joshi',    specialty: 'Neurologist',         available: 'Wed, Fri' },
];

// ─── 5. Routes ────────────────────────────────────────────────────────────────

// GET /  →  Home page
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// GET /doctors  →  Display the list of doctors
app.get('/doctors', (req, res) => {
  // Pass the doctors array to the EJS template
  res.render('doctors', { title: 'Our Doctors', doctors });
});

// GET /book  →  Show the appointment booking form
app.get('/book', (req, res) => {
  // Pass doctors list so the form can populate the dropdown
  // success=null means no success message on first load
  res.render('book', { title: 'Book Appointment', doctors, success: null, errors: [] });
});

// POST /book  →  Handle form submission and save to MongoDB
app.post('/book', async (req, res) => {
  // Destructure form fields from request body
  const { name, doctor, date, time } = req.body;

  // ── Basic server-side validation ──────────────────────────────────────────
  const errors = [];

  if (!name || name.trim() === '')    errors.push('Patient name is required.');
  if (!doctor || doctor === '')       errors.push('Please select a doctor.');
  if (!date || date === '')           errors.push('Please select a date.');
  if (!time || time === '')           errors.push('Please select a time slot.');

  // If date is in the past, reject it
  if (date) {
    const chosen = new Date(date);
    const today  = new Date();
    today.setHours(0, 0, 0, 0);   // reset time to compare only dates
    if (chosen < today) errors.push('Appointment date cannot be in the past.');
  }

  // If there are validation errors, re-render the form with error messages
  if (errors.length > 0) {
    return res.render('book', { title: 'Book Appointment', doctors, success: null, errors });
  }

  // ── Save to MongoDB ────────────────────────────────────────────────────────
  try {
    // Create a new Appointment document
    const newAppointment = new Appointment({ name, doctor, date, time });

    // Save it to the database
    await newAppointment.save();

    // Re-render the form with a success message
    res.render('book', {
      title: 'Book Appointment',
      doctors,
      success: `Appointment booked successfully for ${name} with ${doctor}!`,
      errors: []
    });
  } catch (err) {
    console.error('Error saving appointment:', err);
    res.render('book', {
      title: 'Book Appointment',
      doctors,
      success: null,
      errors: ['Something went wrong. Please try again.']
    });
  }
});

// GET /appointments  →  Show all booked appointments from MongoDB
app.get('/appointments', async (req, res) => {
  try {
    // Fetch all appointments, newest first (-1 = descending order)
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.render('appointments', { title: 'All Appointments', appointments });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.render('appointments', { title: 'All Appointments', appointments: [] });
  }
});

// ─── 6. Start the server ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
