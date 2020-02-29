
const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const cors = require('cors');
const aylien = require('aylien_textapi');
const app = express()




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(express.static('dist'))

const newObj = () => {
  let newObj = {};
  return newObj;
};

module.exports = {newObj}; 



const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    
  });


  

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
})


app.post('/api', async (req, res, next) => {
    const { text } = req.body;
    console.log(text);
    
    try {
        console.log("Sending request to sentiment");
       textapi.sentiment({text }, 
        function(error, response) {
        if (error === null) {
          console.log(response);
          res.send(response);
        }
      });
    } catch(error) {
      // Passes errors into the handler
      console.log(error);
    }
  })

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})



