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
    res.sendFile('dist/index.html');

})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');

})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

 app.post('/travel', (req, res) => {
    var Request = require("request");
    const baseurl  =  'https://pixabay.com/api/?key=15529020-ccd5d7e720b7e14c2b220f387&image_type=photo&q=';
    const datasendback = {};
    Request.get({
        "headers": {
            "content-type": "application/json"
        },
        "url": baseurl + req.body.name
    }, (error, response, body) => {
        if (error) {

            res.send({
                success: false,
                error: 'error'
            });
            return console.log(error);
        }
        console.log('obdy is ', body);
        try {
            body = JSON.parse(body);
              datasendback.image = 
                 body.hits[0].webformatURL;
                 const geourl ='http://api.geonames.org/wikipediaSearchJSON?formatted=true&maxRows=10&username=mingh4hire&style=full&q=';
                 Request.get({
                     "headers": {
                         "content-type": "application/json"
                     },
                     "url": geourl + req.body.name
                 }, (error, response, body) => {
                     if (error) {
             
                         console.log(error);
                     }
                     try {
                         body = JSON.parse(body);
                         console.log(' geo ', body)
                         datasendback.lat = 
                         body.geonames[0].lat;
                         datasendback.lng = 
                         body.geonames[0].lng;
                         if (datasendback.lat){
                             const darkapi = 'https://api.darksky.net/forecast/8fd1daf648815dc13b50bbedd395ead5/'
                             Request.get({
                                 "headers": {
                                     "content-type": "application/json"
                                 },
                                 "url": darkapi + datasendback.lat + "," + datasendback.lng
                             }, (error, response, body) => {
                                 if (error) {
                         
                                     res.send({
                                         success: false,
                                         error: 'error'
                                     });
                                     return console.log(error);
                                 }
                                 try {
                                     body = JSON.parse(body);
                                     console.log('time p is ',  body)
                                     datasendback.temp = body.currently.temperature
                                    console.log('data send back  is '  ,  datasendback);
                                     res.send(JSON.stringify(datasendback));
             
                                 } catch (err) {
                                      
                                 }
                         
                             });
                         }
               
                     } catch (err) {
                          
                     }
             
                 });
             



            
        } catch (err) {
             
        }

    });

   
    return;



 
    

})