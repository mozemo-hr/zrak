const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/zrak'));

// redirect to https on Heroku
// https://stackoverflow.com/a/23894573
app.use(function (req, res, next) {
  console.log("Headers", req.headers);
  if (
    req.headers['x-forwarded-proto'] &&
    req.headers['x-forwarded-proto'] !== 'https'
  )
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  else return next(); /* Continue to other routes if we're not redirecting */
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/zrak/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
