const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default reservations
let reservations = [
  {
    name: 'Angel',
    phone: '8112345678',
    email: 'angel@mail.com',
    id: '1',
  },
  {
    name: 'Adriana',
    phone: '8112345679',
    email: 'adriana@mail.com',
    id: '2',
  },
  {
    name: 'Sofia',
    phone: '8112300008',
    email: 'sofia@mail.com',
    id: '3',
  },
  {
    name: 'Fernando',
    phone: '8110000008',
    email: 'fernando@mail.com',
    id: '4',
  },
  {
    name: 'Martha',
    phone: '8112300028',
    email: 'marta@mail.com',
    id: '5',
  },
];

// Default waitlist
let waitlist = [
  {
    name: 'Manuel',
    phone: '8112341110',
    email: 'manuel@mail.com',
    id: '11',
  },
  {
    name: 'Jorge',
    phone: '8112345331',
    email: 'jorge@mail.com',
    id: '12',
  },
];

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Reserve
app.get('/reserve', (req, res) => {
  res.sendFile(path.join(__dirname, 'reserve.html'));
});

// Tables
app.get('/tables', (req, res) => {
  res.sendFile(path.join(__dirname, 'tables.html'));
});

// Get reservations JSON
app.get('/api/tables', (req, res) => {
  res.json(reservations);
});

// Get waitlist JSON
app.get('/api/waitlist', (req, res) => {
  res.json(waitlist);
});

// Post add reservation
app.post('/api/reserve', (req, res) => {
  let reservation = {
    name: req.body.name.trim(),
    phone: req.body.phone.trim(),
    email: req.body.email.trim(),
    id: req.body.id.trim(),
  };

  // Values are not empty
  if (
    reservation.name.length === 0 ||
    reservation.phone.length === 0 ||
    reservation.email.length === 0 ||
    reservation.id.length === 0
  ) {
    return res.json({ success: false, error: 'Missing values. Fill all fields.' });
  }

  // Check unique IDs in reservations
  for (let item of reservations) {
    if (item.id === reservation.id) {
      return res.json({ success: false, error: 'Use another ID to reserve your table.' });
    }
  }

  // Check unique IDs in waitlist
  for (let item of waitlist) {
    if (item.id === reservation.id) {
      return res.json({ success: false, error: 'Use another ID to reserve your table.' });
    }
  }

  // Add to reservations if there is space available
  if (reservations.length < 5) {
    reservations.push(reservation);
    return res.json({ success: true });
  }

  // Add to waitlist
  waitlist.push(reservation);

  res.json({ success: true });
});

// Clear data
app.post('/api/clear', (req, res) => {
  reservations = [];
  waitlist = [];

  res.end();
});

app.listen(port, () => {
  console.log(`App listening on PORT ${port}`);
});
