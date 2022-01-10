var express = require('express');
var router = express.Router();
var client = require('../m2m/client.js');

function deviceOn(){
  client.output(100, 33).on();
  client.output(100, 35).on();
  client.output(200, 33).on();
  client.output(200, 35).on();
}

function deviceOff(){
  client.output(100, 33).off();
  client.output(100, 35).off();
  client.output(200, 33).off();
  client.output(200, 35).off();
}

// GET '/device-on' 
router.get('/device-on', function(req, res) {
  console.log('device-on');
  deviceOn();
  res.json({status:true});
});

// GET '/device-off'
router.get('/device-off', function(req, res) {
  console.log('device-off');
  deviceOff();
  res.json({status:false});
});

// POST '/device-toggle'
router.post('/device-toggle', function(req, res) {
  console.log('device-toggle', req.body);
  if(req.body.state){
    deviceOn();
    res.json({status:true});
  }
  else{
    deviceOff();
    res.json({status:false});
  }  
});

// POST '/device-control'
router.post('/device-control', function(req, res) {
  console.log('device-control', req.body);
  if(req.body.state){
    client.gpio({id:200, mode:'out', pin:req.body.pin}).on((state) => {
    //client.output(200, 33).on((state) => { // alternate api
      console.log('device 200 output ON pin 35', state);
      res.json({status:state, pin:req.body.pin});
    });
  }
  else{
    client.gpio({id:200, mode:'out', pin:req.body.pin}).off((state) => {
    //client.output(200, 33).off((state) => { // alternate api
      console.log('device 200 output OFF pin 35', state);
      res.json({status:state, pin:req.body.pin});
    });
  }  
});

// GET '/get-data'
router.get('/get-data', (req, res) => {
  console.log('get-data ...');
  //client.getData(100, 'get-data', (data) => { // alternate api
  client.getData({id:100, channel:'get-data'}, (data) => { 
    console.log('data', data);
    res.json({value:data}); 
  });
});

// POST '/send-data'
router.post('/send-data', (req, res) => {
  console.log('send-data ...', req.body);
  //client.sendData(100, 'send-data', req.body.value, (data) => { // alternate api
  client.sendData({id:100, channel:'send-data', payload:req.body.value}, (data) => {
    console.log('data', data);
    res.json({value:data}); 
  });
});

module.exports = router;

