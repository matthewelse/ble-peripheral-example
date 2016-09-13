# ble-peripheral-example
Cross Platform BLE Peripheral Example

## Instructions

### mbed OS

You need mbed-cli, as well as the ARM Embedded GCC toolchain. You also need gulp:

```bash
git clone https://github.com/matthewelse/ble-peripheral-example
cd ble-peripheral-example
npm install
gulp --target=NRF52_DK
```

The output hex file is now in `build/out/mbedos5.hex`.

### macOS

You can run this straight away as a node module:

```bash
git clone https://github.com/matthewelse/ble-peripheral-example
cd ble-peripheral-example
npm install
node main.js
```
