// Create Environmental Variables
const dotenv = require('dotenv')
dotenv.config(); 

//Import workbox webpack plugin


// Import app
const app = require("./app")
// Spin up the server
const port = process.env.PORT || 3000;

// Callback to debug
app.listen(port, () => console.log(`The server is running on port ${port}`));

