const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const serviceClient = new DigitalTwinsClient(url, credential);

const serraTwinId = "SerraA";

async function main() {
    const serraTwin = {
        $dtId: serraTwinId,
        $metadata: {
            $model: "dtmi:example:Serra;1",
        }
    };

    try {
        const createdTwin = await serviceClient.upsertDigitalTwin(serraTwinId, JSON.stringify(serraTwin));
        console.log("Created Digital Twin:");
        console.log(inspect(createdTwin));
    } catch (error) {
        console.error("Error creating/upserting Digital Twin:", error);
    }
}

main();
