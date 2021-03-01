'use strict'
const { processInput } = require("../utils");

const chai = require('chai')
const expect = chai.expect

describe ("Entradas de test", () => {
  it('Entrada 1: Regular: 16Mar2020(mon), 17Mar2020(tues), 18Mar2020(wed)', async () => {
    const resultado = await processInput("Regular: 16Mar2020(mon), 17Mar2020(tues), 18Mar2020(wed)");
    expect(resultado.hotel).to.equal('Parque das flores');
    expect(resultado.clasificacao).to.equal('3');
    expect(resultado.valor).to.equal(330);
  });

  it('Entrada 2: Regular: 20Mar2020(fri), 21Mar2020(sat), 22Mar2020(sun)', async () => {
    const resultado = await processInput("Regular: 20Mar2020(fri), 21Mar2020(sat), 22Mar2020(sun)");
    expect(resultado.hotel).to.equal('Jardim Botânico');
    expect(resultado.clasificacao).to.equal('4');
    expect(resultado.valor).to.equal(280);
  });

  it('Entrada 3: Fidelidade: 26Mar2020(thur), 27Mar2020(fri), 28Mar2020(sat)', async () => {
    const resultado = await processInput("Fidelidade: 26Mar2020(thur), 27Mar2020(fri), 28Mar2020(sat)");
    expect(resultado.hotel).to.equal('Mar Atlântico');
    expect(resultado.clasificacao).to.equal('5');
    expect(resultado.valor).to.equal(240);
  });

  it('Error 1: Datas invalidas', async () => {
    const resultado = await processInput("Fidelidade: 26Mar2020(invalida), 27Mar2020(fri), 28Mar2020(sat)");
    expect(resultado.error).to.equal('Datas invalidas.');
  });

  it('Error 2: Tipo de cliente invalido.', async () => {
    const resultado = await processInput("Invalido: 26Mar2020(thur), 27Mar2020(fri), 28Mar2020(sat)");
    expect(resultado.error).to.equal('Tipo de cliente invalido.');
  });
});