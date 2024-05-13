const express = require('express');
const cors = require('cors');
const ConnectToMongo = require('./db.js');
const corsOptions = {
    origin: 'http://localhost:5173',
    // Other options if needed
    credentials: true
  };
ConnectToMongo();

const app = express();
const port = 5000;

app.use(express.json()); 
app.use(cors(corsOptions));

// Define your routes here
app.get("/", (req, res) => {
    res.send("<h1>Hello this is Rishi's server</h1>")
});

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/user', require('./routes/post.js'));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
