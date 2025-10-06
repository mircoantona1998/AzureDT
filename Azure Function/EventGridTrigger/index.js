const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

module.exports = async function (context, eventGridEvent) {
    const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);

    const deviceMessage = eventGridEvent.data;
    const deviceId = deviceMessage.systemProperties["iothub-connection-device-id"];
    const temperature = parseFloat(deviceMessage.body.Temperature);

    const twinPatch = [
      {
        op: "replace",
        path: "/TemperatureSensorValue",
        value: temperature
      }
    ];

    try {
        const updatedTwin = await serviceClient.updateDigitalTwin(deviceId, twinPatch);
        console.log(`Updated Digital Twin:`);
        console.log(inspect(updatedTwin));
    } catch (err) {
        console.error("Error updating Digital Twin:", err);
    }
};
