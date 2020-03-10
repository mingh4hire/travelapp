var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);

const app = express()

app.use(express.static('dist'))
const bodyParser = require('body-parser')
app.use(bodyParser.json());

console.log(__dirname)
console.log(__dirname)
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

var AYLIENTextAPI = require('aylien_textapi');
app.post('/sentiment', (req, res) => {
    if (!req.body.message) {
        console.log('err is body empty');
        res.status(400).send(
            JSON.stringify({
                error: 'bad input',
                message: 'Bad Input'
            }));
        return;
    }
    /* create your own .env file located in the root and add your own credentials there*/
    /* this was advised in the instructions not to include our credentials inside of the code and 
    not to check it into the git repository*/

    //credentials are located in the .env file in the root foder
    //please create .env file yourself and put your credentials inside of it
    //like below
    // API_ID = 0727edummyvalue this is not real value
    // API_KEY = 0w3dummyvalue
    var textapi = new AYLIENTextAPI({
        application_id: process.env.API_ID,
        application_key: process.env.API_KEY
    });
    textapi.sentiment({
        'text': req.body.message
    }, function (error, response) {
        if (error === null) {
            console.log(response);
            res.send(JSON.stringify(response));
        }
    });

})