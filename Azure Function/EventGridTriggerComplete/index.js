const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

module.exports = async function (context, eventGridEvent) {
    const url = "https://DigitalTwinsAntona.api.weu.digitaltwins.azure.net";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);

    try {
        var deviceMessage = JSON.stringify(eventGridEvent.data);
        deviceMessage = JSON.parse(deviceMessage);
        context.log(`Device Message: ${JSON.stringify(deviceMessage)}`);

        var deviceId = deviceMessage["systemProperties"]["iothub-connection-device-id"].toString();
        var temperature = parseFloat(deviceMessage.body.Temperature);
        var solarIrradiance = parseFloat(deviceMessage.body.Solar_Irradiance);
        var windSpeed = parseFloat(deviceMessage.body.Wind_Speed);
        var humidity = parseFloat(deviceMessage.body.Humidity);
        var weatherCondition = deviceMessage.body.Weather_Condition;
        
        var voltage = parseFloat(deviceMessage.body.Voltage);
        var current = parseFloat(deviceMessage.body.Current);
        var powerOutput = parseFloat(deviceMessage.body.Power_Output);
        var energyProduced = parseFloat(deviceMessage.body.Energy_Produced);
        var efficiency = parseFloat(deviceMessage.body.Efficiency);

        var temperatureCell = parseFloat(deviceMessage.body.Temperature_Cell);
        var dirtLevel = parseFloat(deviceMessage.body.Dirt_Level);
        var degradationRate = parseFloat(deviceMessage.body.Degradation_Rate);
        var connectionStatus = deviceMessage.body.Connection_Status;

        var peakPowerOutput = parseFloat(deviceMessage.body.Peak_Power_Output);
        var averageDailyEnergy = parseFloat(deviceMessage.body.Average_Daily_Energy);
        var energyLoss = parseFloat(deviceMessage.body.Energy_Loss);
        var co2Savings = parseFloat(deviceMessage.body.CO2_Savings);

        context.log(`Device ID: ${deviceId}`);
        context.log(`Temperature: ${temperature}`);
        context.log(`Solar Irradiance: ${solarIrradiance}`);
        context.log(`Wind Speed: ${windSpeed}`);
        context.log(`Humidity: ${humidity}`);
        context.log(`Weather Condition: ${weatherCondition}`);

        const twinPatch = [
            { "op": "add", "path": "/Temperature", "value": temperature },
            { "op": "add", "path": "/Solar_Irradiance", "value": solarIrradiance },
            { "op": "add", "path": "/Wind_Speed", "value": windSpeed },
            { "op": "add", "path": "/Humidity", "value": humidity },
            { "op": "add", "path": "/Weather_Condition", "value": weatherCondition },
            
            { "op": "add", "path": "/Voltage", "value": voltage },
            { "op": "add", "path": "/Current", "value": current },
            { "op": "add", "path": "/Power_Output", "value": powerOutput },
            { "op": "add", "path": "/Energy_Produced", "value": energyProduced },
            { "op": "add", "path": "/Efficiency", "value": efficiency },

            { "op": "add", "path": "/Temperature_Cell", "value": temperatureCell },
            { "op": "add", "path": "/Dirt_Level", "value": dirtLevel },
            { "op": "add", "path": "/Degradation_Rate", "value": degradationRate },
            { "op": "add", "path": "/Connection_Status", "value": connectionStatus },

            { "op": "add", "path": "/Peak_Power_Output", "value": peakPowerOutput },
            { "op": "add", "path": "/Average_Daily_Energy", "value": averageDailyEnergy },
            { "op": "add", "path": "/Energy_Loss", "value": energyLoss },
            { "op": "add", "path": "/CO2_Savings", "value": co2Savings }
        ];

        context.log(`Patch document: ${JSON.stringify(twinPatch)}`);

        const updatedTwin = await serviceClient.updateDigitalTwin(deviceId, twinPatch);
        context.log(`Updated Digital Twin: ${inspect(updatedTwin)}`);
    } catch (error) {
        context.log(`Error updating twin: ${error.message}`);
        context.log(error.stack);
    }
};


