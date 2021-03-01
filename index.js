const { start, get } = require('prompt');
const  { processInput } = require('./utils');

const properties = [
    {
        name: 'userInput'
    }
];

start();

const startReading = async () => {
    get(properties, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result.userInput !== "exit") {
            processInput(result.userInput).then(bestPrice => {

                bestPrice.error ? console.log(bestPrice.error) : console.log(bestPrice);
                startReading();
            });
        } else {
            process.exit();
        }
    });
}

startReading();