const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

const url = "https://IndustrialGemelliDigitali.api.weu.digitaltwins.azure.net";
const credential = new DefaultAzureCredential();
const serviceClient = new DigitalTwinsClient(url, credential);

const Lotto=require("../Esercizio Modello Serra Agricola/Lotto.json")
const Serra=require("../Esercizio Modello Serra Agricola/Serra.json")
const Thermostat=require("../Esercizio Modello Serra Agricola/Thermostat.json")


async function main(){
    const newModels = [Lotto,Serra,Thermostat];
    const create_model = await serviceClient.createModels(newModels);
    console.log(`Created Model:`);
    console.log(inspect(create_model));
}

main()