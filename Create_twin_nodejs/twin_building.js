const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const serviceClient = new DigitalTwinsClient(url, credential);

const buildingTwinId = "Building1";

async function main() {
    const buildingTwin = {
        $dtId: buildingTwinId,
        $metadata: {
            $model: "dtmi:example:Building;1"
        },
        Date: "2025-05-10"
    };

    try {
        const createdTwin = await serviceClient.upsertDigitalTwin(buildingTwinId, JSON.stringify(buildingTwin));
        console.log("Created Digital Twin:");
        console.log(inspect(createdTwin));
    } catch (error) {
        console.error("Error creating/upserting Digital Twin:", error);
    }
}

main();
