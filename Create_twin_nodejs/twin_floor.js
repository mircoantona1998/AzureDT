const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const serviceClient = new DigitalTwinsClient(url, credential);

const floorTwinId = "Floor1";

async function main() {
    const floorTwin = {
        $dtId: floorTwinId,
        $metadata: {
            $model: "dtmi:example:Floor;1"
        }
    };

    try {
        const createdTwin = await serviceClient.upsertDigitalTwin(floorTwinId, JSON.stringify(floorTwin));
        console.log("Created Floor Twin:");
        console.log(inspect(createdTwin));
    } catch (error) {
        console.error("Error creating Floor Twin:", error);
    }
}

main();
