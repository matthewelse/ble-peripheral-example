var ble = require('ble-peripheral');

var batterySrvcUUID = '180f';
var batteryCharUUID = '2a19';
var batteryChar = new ble.Characteristic(batteryCharUUID, ['read', 'notify'], 1);
var batteryService = new ble.PrimaryService(batterySrvcUUID, [batteryChar]);
var batteryLevel = 100;

print('created variables');

ble.onConnection(function() {
    print("someone connected!!!");
});

ble.onDisconnection(function() {
    ble.startAdvertising();
});

ble.ready(function() {
    print("ble stack ready");
    ble.addServices([
        batteryService
    ]);
    ble.startAdvertising("Battery Device", [batterySrvcUUID]);
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
