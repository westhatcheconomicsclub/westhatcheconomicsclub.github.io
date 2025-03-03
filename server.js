// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// In-memory storage (replace with database in production)
let members = ['John Doe', 'Jane Smith']; // Initial sample data

// Get all members
app.get('/get_members', (req, res) => {
    res.json({ members });
});

// Add new member
app.post('/add_member', (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid name' });
    }
    if (members.includes(name)) {
        return res.status(400).json({ error: 'Member already exists' });
    }
    members.push(name);
    res.json({ success: true });
});

// Remove member
app.delete('/remove_member', (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid name' });
    }
    const initialLength = members.length;
    members = members.filter(member => member !== name);
    if (members.length === initialLength) {
        return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ success: true });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});