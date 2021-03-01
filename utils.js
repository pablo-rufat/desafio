const { client } = require('./config');

const validateClientType = (tipoCliente) => {
    if (tipoCliente !== "regular" && tipoCliente !== "fidelidade") return false;
    return true;
}
const validateDias = (datas) => {
    return datas.find( data => !['mon', 'tues', 'wed', 'thur', 'fri', 'sat', 'sun'].includes(data) );
}

const parseInput = async (userInput) => {

    let error;

    userInput = userInput.trim();
    const dividedInput = userInput.split(':');

    const tipoCliente = dividedInput[0].toLowerCase();
    if (!validateClientType(tipoCliente)) error = "Tipo de cliente invalido.";

    const datas = dividedInput[1].split(',');
    datas.forEach( (data, index) => datas[index] = data.match(/\((.*)\)/i)[1] );
    if (validateDias(datas)) error = "Datas invalidas.";

    const diasSemana = datas.map(data => ['mon', 'tues', 'wed', 'thur', 'fri'].includes(data) ? "semana" : "fds");

    return {
        error,
        inputData: {
            tipoCliente,
            diasSemana
        }
    };
}

const fetchFees = async (inputData) => {

    return Promise.all(
        inputData.diasSemana.map(async dia => {
            const result = await client.query(
                `SELECT * FROM tarifas
                WHERE cliente = $1
                AND dia = $2;`, [inputData.tipoCliente, dia]);
            return {
                dia,
                fees: result.rows
            };
        })
    );
}

const getBestPrice = async (fees) => {
    const hoteis = await client.query('SELECT DISTINCT hotel, clasificacao FROM tarifas');
    const sumByHotel = [];

    hoteis.rows.forEach(hotel => {
        let sum = 0;
        fees.forEach(fee => {
            sum += fee.fees.find(element => element.hotel === hotel.hotel).valor;
        });
        sumByHotel.push({
            hotel: hotel.hotel,
            clasificacao: hotel.clasificacao,
            valor: sum
        });
    });

    return sumByHotel.reduce((minimo, current) => {
        if (current.valor < minimo.valor){
            return current;
        }else if (current.valor === minimo.valor) {
            return Number(current.clasificacao) >= Number(minimo.clasificacao) ? current : minimo;
        } else {
            return minimo;
        }
    }, sumByHotel[0]);
}

exports.processInput = async (userInput) => {

    const parsedInput = await parseInput(userInput);
    if (parsedInput.error) {
        return {error: parsedInput.error};
    }
    const fees = await fetchFees(parsedInput.inputData);
    const bestPrice = await getBestPrice(fees);

    return bestPrice;
}