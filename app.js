var express = require('express');
var app = express();
var port = 8084;

var set = require('./set');

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});


app.get('/', function(req, res) {
    res.json({
        message: 'nodejs scraping avalible'
    });
});

app.use('/set', set);
