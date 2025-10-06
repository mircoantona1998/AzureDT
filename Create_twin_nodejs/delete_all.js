const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const client = new DigitalTwinsClient(url, credential);

async function deleteAllTwinsAndModels() {
    try {
        const twins = client.queryTwins("SELECT * FROM digitaltwins");
        for await (const twin of twins) {
            const twinId = twin.$dtId;

            const relationships = client.listRelationships(twinId);
            for await (const rel of relationships) {
                await client.deleteRelationship(twinId, rel.$relationshipId);
                console.log(`Relazione '${rel.$relationshipId}' da '${twinId}' eliminata`);
            }

            await client.deleteDigitalTwin(twinId);
            console.log(`Twin '${twinId}' eliminato`);
        }

        const models = await client.listModels();
        for await (const model of models) {
            try {
                await client.deleteModel(model.id);
                console.log(`Modello '${model.id}' eliminato`);
            } catch (err) {
                console.warn(`Impossibile eliminare modello '${model.id}': ${err.message}`);
            }
        }

        console.log("Tutti i twin e modelli sono stati cancellati.");
    } catch (err) {
        console.error("Errore durante la cancellazione:", err.message);
    }
}

deleteAllTwinsAndModels();
