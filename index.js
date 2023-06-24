// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function padZero(num) {
  return num < 10 ? "0" + num : num;
}


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let date;
  
  if(!req.params.date) {

    date = new Date();

  }else if(isNaN(req.params.date)){

    date = new Date(req.params.date);

  }else {

    date = new Date(parseInt(req.params.date));

  }
  // const dateObj = new Date(date);
  // console.log(dateObj)

  if(isNaN(date)) {
    return res.json({error: "Invalid Date"})
  }
  
  const day = date.getUTCDay();
  const dat = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const outputDate = weekdays[day] + ", " + padZero(dat) + " " + months[month] + " " + year + " " + padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds) + " GMT";

  const unixTimestamp = date.getTime();
  
  res.json({unix: unixTimestamp, utc: outputDate})

  
});


// listen for requests :)
var listener = app.listen(process.env.port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// listener.address().port