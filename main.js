var ble = require('ble-peripheral');

var batterySrvcUUID = '180d';
var batteryCharUUID = '2a37';
var batteryChar = new ble.Characteristic({
    uuid: batteryCharUUID,
    properties: ['read', 'notify'],
    value: null
});
var batteryService = new ble.PrimaryService({
    uuid: batterySrvcUUID,
    characteristics: [batteryChar]
});
var batteryLevel = 100;

print('created variables');

ble.onConnection(function() {
    print("someone connected!!!");
});

ble.onDisconnection(function() {
    print("disconnected");
    ble.startAdvertising();
});

ble.ready(function() {
    print("ble stack ready");
    ble.setServices([
        batteryService
    ]);
    print("added services");
    ble.startAdvertising("Heart Rate Device", [batterySrvcUUID]);
    print("advertising");
});

setInterval(function() {
    if (ble.isConnected()) {
        batteryChar.write([batteryLevel]);

        batteryLevel--;
        if (batteryLevel <= 0) {
            batteryLevel = 100;
        }
    }
}, 1000);

print("main.js has finished executing.");
