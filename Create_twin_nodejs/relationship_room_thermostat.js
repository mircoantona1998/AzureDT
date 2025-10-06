const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const client = new DigitalTwinsClient(url, credential);

const relationship = {
    $relationshipId: "Room1_containsThermostat_Thermo1",
    $sourceId: "Room1",
    $relationshipName: "containsThermostat",
    $targetId: "Thermostat1"
};

async function main() {
    try {
        await client.upsertRelationship(
            relationship.$sourceId,
            relationship.$relationshipId,
            relationship
        );
        console.log("Room Thermostat relationship created");
    } catch (err) {
        console.error("Error creating Room Thermostat relationship:", err);
    }
}

main();
