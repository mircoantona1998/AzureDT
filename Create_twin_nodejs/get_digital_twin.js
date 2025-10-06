const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");

const url = "https://DigitalTwinIndustrialInformatics.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const client = new DigitalTwinsClient(url, credential);

const query = `SELECT * FROM digitaltwins`; 

async function main() {
    try {
        const result = client.queryTwins(query);
        console.log("Risultati della query:");
        for await (const twin of result) {
            console.log(JSON.stringify(twin, null, 2));
        }
    } catch (err) {
        console.error("Errore nella query:", err.message);
    }
}

main();
