const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const client = new DigitalTwinsClient(url, credential);

const relationship = {
    $relationshipId: "LottoA_contains_SerraA",
    $sourceId: "LottoA",
    $relationshipName: "contains",
    $targetId: "SerraA"
};

async function main() {
    try {
        await client.upsertRelationship(
            relationship.$sourceId,
            relationship.$relationshipId,
            relationship
        );
        console.log("Lotto Serra relationship created");
    } catch (err) {
        console.error("Error creating Lotto Serra relationship:", err);
    }
}

main();
