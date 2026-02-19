// Code taken from exploration
//import env credentials
require('dotenv').config();

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')
let username = process.env.USERNAME;
let password = process.env.PASSWORD;

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : username,
    password          : password,
    database          : username
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;