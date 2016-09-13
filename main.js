var ble = require('ble-peripheral');

var hrmSrvcUUID = '180d'; // Heart Rate Service UUID
var hrmCharUUID = '2a37'; // Heart Rate Characteristic UUID

var hrmChar = new ble.Characteristic({
    uuid: hrmCharUUID,
    properties: ['read', 'notify'],
    value: null
});
var hrmService = new ble.PrimaryService({
    uuid: hrmSrvcUUID,
    characteristics: [hrmChar]
});

var heart_rate = 100;

ble.onConnection(function() {
    print("someone connected!");
});

ble.onDisconnection(function() {
    print("disconnected!");
    ble.startAdvertising();
});

ble.ready(function() {
    print("ble stack ready");
    ble.setServices([
        hrmService
    ]);
    print("added services");
    ble.startAdvertising("Heart Rate Device", [hrmSrvcUUID]);
    print("advertising");
});

setInterval(function() {
    if (ble.isConnected()) {
        hrmChar.write([heart_rate]);

        heart_rate--;
        if (heart_rate <= 50) {
            herat_rate = 100;
        }
    }
}, 1000);
