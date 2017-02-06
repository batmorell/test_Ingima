const express = require('express');
const path = require('path');
const Client = require('node-rest-client').Client;

/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();
const client = new Client();

app.use(express.static(path.join( __dirname, '../public')));

app.get('/api/search/:name', function(req, res) {

  var request = "https://api.spotify.com/v1/search?q=" + encodeURIComponent(req.params.name.trim()) + "&type=artist";

  client.get(request, function (data, response) {
    res.json(data.artists);
  });

});

app.get('/api/artist/:id', function(req, res) {

  client.get("https://api.spotify.com/v1/artists/" +req.params.id +"/albums", function (data, response) {
    res.json(data);
  });

});

app.get('/api/album/:id', function(req, res) {

  client.get("https://api.spotify.com/v1/albums/" + req.params.id, function (data, response) {
    res.json(data);
  });

});

app.get('*', function (req, res) {
  res.sendFile(path.join( __dirname, '../public/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server listening : http://localhost:%s', port);
  }
});
