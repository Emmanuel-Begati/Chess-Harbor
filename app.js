const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // Import the path module

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database(':memory:'); // In-memory database for demonstration, replace ':memory:' with a file path for persistent storage
db.serialize(() => {
    db.run("CREATE TABLE users (first_name TEXT, username TEXT, email TEXT, password TEXT)");
});

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
// Route to handle form submission
app.post('/signup', (req, res) => {
    const { first_name, username, email, password } = req.body;
    
    // Insert the user into the SQLite database
    db.run(`INSERT INTO users (first_name, username, email, password) VALUES (?, ?, ?, ?)`, [first_name, username, email, password], function(err) {
        if (err) {
            console.error('Error saving user:', err);
            return res.status(500).send('Error saving user to the database');
        }
        // Redirect the user to explore.html after successful signup
        res.redirect('explore/explore.html');
    });
});


// Route to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the SQLite database
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function(err, row) {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).send('Error finding user in the database');
        }
        if (!row) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(row); // You may want to send back only necessary information
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
