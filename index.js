const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyAMA0', {
    baudRate: 9600,
    parser: SerialPort.parsers.readline('\n')
});

const logs = [];
 
port.on('open', function() {
  port.write('Node.js', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });
});
 
// open errors will be emitted as an error event 
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
    const d = JSON.parse(data);
    // assume the time the data is received is when it is recorded
    // according to Adafruit driver for the AM2302, there might be a 2 second delay
    // we read the data on the arduino every 5 seconds
    // there is some processing and transmission delay too
    d.time = new Date();
    console.log(d);
    logs.push(d);
});