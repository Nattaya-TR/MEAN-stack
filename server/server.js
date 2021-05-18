const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const PORT = 6969;


mongoose.connect('mongodb+srv://nattaya:<nattaya>@cluster.epumi.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('connect');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

let AllClients = [{ firstName: 'Nattaya', lastName: 'Trouillard', email: 'nattaya.trouille@gmail.com', phoneNumber: '+32472114366'}];

// Below you can define how your API handles a get or a post request.
// Try sending a get request to the root, you should get a "Hello from server" back.

app.get('/', function (request, response) {
    response.send('Hello from server');
});

app.get('/allClients', function (request, response) {
    response.send(AllClients);
});

app.post('/addClient', function (request, response) {
    AllClients.push(request.body);
    response.status(200).send(AllClients);
});


app.post('/', function (request, response) {
    response.status(200).send({"message": "Data received"});
});


app.listen(PORT, function () {});


