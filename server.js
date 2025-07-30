const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Data dummy untuk demo (nanti diganti database)
let requests = [
  { id: 1, user: 'user1', type: 'deposit', amount: 2, status: 'pending' },
  { id: 2, user: 'user2', type: 'withdraw', amount: 1.5, status: 'pending' },
];

// Endpoint: Lihat semua request
app.get('/api/requests', (req, res) => {
  res.json(requests);
});

// Endpoint: Buat request baru (deposit/withdraw)
app.post('/api/requests', (req, res) => {
  const { user, type, amount } = req.body;
  const newRequest = {
    id: Date.now(),
    user,
    type,
    amount,
    status: 'pending'
  };
  requests.push(newRequest);
  res.json(newRequest);
});

// Endpoint: Approve/Reject request (admin)
app.post('/api/requests/:id/:action', (req, res) => {
  const { id, action } = req.params;
  requests = requests.map(r =>
    r.id == id ? { ...r, status: action } : r
  );
  res.json({ success: true });
});

const PORT = 4000;
app.listen(PORT, () => console.log('Backend running on port', PORT));