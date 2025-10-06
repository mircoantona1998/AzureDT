'use strict';

const Protocol = require('azure-iot-device-mqtt').Mqtt;
const Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

var hostName = "industrialinformaticshub.azure-devices.net";
var deviceId = "Thermostat1";
var sharedAccessKey = "dkypoJCgsVdArZP0ASwVbuRPZynQHK0ksnEuSA29Mok="; 

var connectionString = "HostName=" + hostName + ";DeviceId=" + deviceId + ";SharedAccessKey=" + sharedAccessKey;
var client = Client.fromConnectionString(connectionString, Protocol);

function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}
var connectCallback = function (err) {
    if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');
        setInterval(function() {
            var Temperature = (Math.random() * 40).toFixed(2); 
            var data =JSON.stringify({
                "Temperature": Temperature
            });
            var message = new Message(data);
            message.contentType = "application/json";
            message.contentEncoding = "utf-8";
            console.log("Sending message: " + message.getData());
            client.sendEvent(message, printResultFor('send'));
        }, 1000); 
    }
};
client.open(connectCallback);

