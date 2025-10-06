const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const client = new DigitalTwinsClient(url, credential);

const relationship = {
    $relationshipId: "Building1_contains_Floor1",
    $sourceId: "Building1",
    $relationshipName: "contains",
    $targetId: "Floor1"
};

async function main() {
    try {
        await client.upsertRelationship(
            relationship.$sourceId,
            relationship.$relationshipId,
            relationship
        );
        console.log("Building Floor relationship created");
    } catch (err) {
        console.error("Error creating Building Floor relationship:", err);
    }
}

main();
