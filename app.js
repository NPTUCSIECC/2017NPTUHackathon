const express = require('express');
const request = require('request');
const fs = require("fs");

const app = express();

app.get('/test', function (req, res) {
  let pm25Url = 'http://opendata.epa.gov.tw/ws/Data/ATM00625/?%24skip=0&%24top=1000&format=json';
  let waether = 'http://opendata.epa.gov.tw/ws/Data/ATM00698/?%24skip=0&%24top=1000&format=json';
  let pm25, weather;
  request(pm25Url, (error, response, body) => {
    let data = JSON.parse(body);
    for(let item of data) {
      if(item.Site === '屏東') {
        pm25 = item.PM25;
        break;
      }
    }
    console.log('pm25=>', pm25);
  });
  request(waether, (error, response, body) => {
    let data = JSON.parse(body);
    for(let item of data) {
      if(item.SiteName === '恆春' && item.Weather != "") {
        weather = item.Weather;
        break;
      }
    }
    console.log('weather=>', weather);
  });
    console.log('pm25O=>', pm25);
    console.log('weatherO=>', weather);
  res.json({
    pm25,
    weather
  });
});

const server = app.listen(4000, function () {
  const host = '0.0.0.0';
  const port = server.address().port;
  console.log("server: http://%s:%s", host, port);
})
