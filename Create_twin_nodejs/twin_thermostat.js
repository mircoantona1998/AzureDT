const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const serviceClient = new DigitalTwinsClient(url, credential);

const thermostatTwinId = "Thermostat1";

async function createThermostatTwin() {
    const thermostatTwin = {
        $dtId: thermostatTwinId,
        $metadata: {
            $model: "dtmi:example:Thermostat;1"
        },
        TemperatureSensorValue: 0.0
    };

    try {
        const createdTwin = await serviceClient.upsertDigitalTwin(thermostatTwinId, JSON.stringify(thermostatTwin));
        console.log("Created Thermostat Twin:");
        console.log(inspect(createdTwin));
    } catch (error) {
        console.error("Error creating Thermostat Twin:", error);
    }
}

createThermostatTwin();
