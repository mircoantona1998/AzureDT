const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const client = new DigitalTwinsClient(url, credential);

const relationship = {
    $relationshipId: "Floor1_contains_Room1",
    $sourceId: "Floor1",
    $relationshipName: "contains",
    $targetId: "Room1",
    ownershipUser: "Mario",
    ownershipDepartment: "IT"
};

async function main() {
    try {
        await client.upsertRelationship(
            relationship.$sourceId,
            relationship.$relationshipId,
            relationship
        );
        console.log("Floor Room relationship created");
    } catch (err) {
        console.error("Error creating Floor Room relationship:", err);
    }
}

main();
