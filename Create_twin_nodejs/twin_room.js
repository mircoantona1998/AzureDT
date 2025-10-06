const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const serviceClient = new DigitalTwinsClient(url, credential);

const roomTwinId = "Room1";

async function createRoomTwin() {
    const roomTwin = {
        $dtId: roomTwinId,
        $metadata: {
            $model: "dtmi:example:Room;1"
        }
    };

    try {
        const createdTwin = await serviceClient.upsertDigitalTwin(roomTwinId, JSON.stringify(roomTwin));
        console.log("Created Room Twin:");
        console.log(inspect(createdTwin));
    } catch (error) {
        console.error("Error creating Room Twin:", error);
    }
}

createRoomTwin();
