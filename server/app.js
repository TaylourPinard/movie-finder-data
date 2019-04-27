const express = require('express');
const app = express();
const morgan = require('morgan');
const axios = require('axios');
const cache = {};
const url = "http://www.omdbapi.com/?apikey=8730e0e";

app.use(morgan('dev'));
app.get('/', function (req, res) {
    const movieId = req.query.i;
    const movieTitle = encodeURIComponent(req.query.t);
    if (movieId) {
        if (cache.hasOwnProperty(movieId)) {
            res.json(cache[movieId]);
        } else {
        axios.get(`${url}&i=${movieId}`)
            .then(response => {
                cache[movieId] = response.data; 
                res.json(cache[movieId]);
            })
            .catch(error => {
                console.log(error);
            }); 
        }
    } 
    else if (req.query.t) {
        if (cache.hasOwnProperty(movieTitle)) {
            res.json(cache[movieTitle]);
        } else {
            axios.get(`${url}&t=${movieTitle}`)
            .then(response => {
                cache[movieTitle] = response.data;
                res.json(cache[movieTitle]);
            })
            .catch(error => {
                console.log(error);
            }); 
        }
    }
});
module.exports = app;