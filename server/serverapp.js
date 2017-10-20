const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
var cors = require('cors');
const app = express();
let crimeUrl = "http://api.spotcrime.com/crimes.json?lat=32.7157&lon=-117.1611&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607&radius=0.175";
var crimeCache = {};
var mapCache = {};
app.use(morgan('dev'));
app.use(cors());


app.get('/crimes', (req, res) => {

    let key = null;

    if (crimeCache.hasOwnProperty(key)) {
        res.json(crimeCache[key]);
    } else {

        axios.get(crimeUrl)
            .then(function(response) {
                crimeCache[key] = response.data;
                console.log(response.data)
                res.json(crimeCache[key]);
            })

        .catch(function(error) {
            console.log(error);
            res.status(500).send('You Suck');
        });
    }
});


module.exports = app;
