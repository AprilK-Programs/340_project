//some Code taken from exploration
// ########################################
// ########## SETUP

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 1335;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/', async function (req, res) {
    try {
        res.render('home'); // Render the home.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

app.get('/inpatient-records', async function (req, res) {
    try {
        const query1 = 'SELECT inPatientDepartments.inPatientID AS "inPatient ID", CONCAT(trainers.trainerFirstName, " ", trainers.trainerLastName) AS "Trainer Name", pokemon.pokemonName AS "Pokemon Name", pokecenters.location AS "Pokecenter Location" FROM inPatientDepartments INNER JOIN trainers ON inPatientDepartments.tid = trainers.trainerID INNER JOIN pokemon ON inPatientDepartments.pid = pokemon.pokemonID INNER JOIN pokecenters ON inPatientDepartments.cid = pokecenters.centerID;';
        const query2 = 'SELECT * FROM trainers;';
        const query3 = 'SELECT * FROM pokemon;';
        const query4 = 'SELECT * FROM pokecenters;';
        const [record] = await db.query(query1)
        const [trainer] = await db.query(query2)
        const [pokemon] = await db.query(query3)
        const [center] = await db.query(query4)
        res.render('inpatient-records', {record:record, trainer:trainer, pokemon:pokemon, center:center });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});
app.get('/trainers', async function (req, res) {
    try {
        const query1 = 'SELECT * FROM trainers; ';
        const [trainer] = await db.query(query1)
        res.render('trainers', {trainer: trainer});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});
app.get('/pokemon', async function (req, res) {
    try {
        const query1 = 'SELECT * FROM pokemon;';
        const [pokemon] = await db.query(query1)
        res.render('pokemon', {pokemon: pokemon});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});
app.get('/pokecenter', async function (req, res) {
    try {
        query1 = 'SELECT * FROM pokecenters;';
        const [center] = await db.query(query1)
        res.render('pokecenter', {center: center});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});
app.get('/employees', async function (req, res) {
    try {
        query1 = 'SELECT * FROM employees;';
        const [emp] = await db.query(query1)
        res.render('employees', {emp: emp});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});