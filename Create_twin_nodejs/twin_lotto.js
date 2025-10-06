const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const serviceClient = new DigitalTwinsClient(url, credential);

const lottoTwinId = "LottoA";

async function main() {
    const lottoTwin = {
        $dtId: lottoTwinId,
        $metadata: {
            $model: "dtmi:example:Lotto;1",
        }
    };

    try {
        const createdTwin = await serviceClient.upsertDigitalTwin(lottoTwinId, JSON.stringify(lottoTwin));
        console.log("Created Digital Twin:");
        console.log(inspect(createdTwin));
    } catch (error) {
        console.error("Error creating/upserting Digital Twin:", error);
    }
}

main();
