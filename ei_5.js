const solver = require('nerdamer');
const AsciiTable = require('ascii-table');

function secantes(funcao, intervaloA, intervaloB, x0, x1, tolerancia, maxIteracoes) {
  let table = new AsciiTable('Método das Secantes');
  table.setHeading('k','Xk','f(Xk)','x','E');
  let xA = x0;
  let xB = x1;
  let iteracoes = 0;
  let fXA = solver(funcao, {x: xA}, 'numer').evaluate().text('decimals');
  table.addRow(iteracoes,xA,fXA,'-','-');
  iteracoes++;
  let fXB = solver(funcao, {x: xB}, 'numer').evaluate().text('decimals');
  let xBarra = ((xA * fXB) - (xB * fXA)) / (fXB - fXA);
  let erro = Math.abs(xBarra - xB);
  table.addRow(iteracoes,xB,fXB,xBarra,erro);

  while (erro > tolerancia && iteracoes < maxIteracoes) {
    iteracoes++;
    xA = xB;
    xB = xBarra;
    fXA = solver(funcao, {x: xA}, 'numer').evaluate().text('decimals');
    fXB = solver(funcao, {x: xB}, 'numer').evaluate().text('decimals');
    xBarra = ((xA * fXB) - (xB * fXA)) / (fXB - fXA);
    erro = Math.abs(xBarra - xB);

    table.addRow(iteracoes,xB,fXB,xBarra,erro);
  }

  for (let i = 0; i < 5; i++) { table.setAlign(i,AsciiTable.RIGHT) }
  
  console.log(table.toString());
  console.log('Número de iterações:',iteracoes);
  console.log('Zero da função:',xBarra);
  let imgXBarra = solver(funcao, {x:xBarra}, 'numer').evaluate();
  console.log('Imagem da função no ponto:',imgXBarra.text('decimals'));

}

secantes('cos(x)-3+e^x', 0, 1, 0.0, 0.8, 0.0000001, 100);
//secantes('x^3-(1/2)', 0, 1, 0, 1, 0.01, 100);