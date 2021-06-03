const solver = require('nerdamer');
const AsciiTable = require('ascii-table');

function regulaFalsi(funcao, intervaloA, intervaloB, tolerancia, maxIteracoes) {
  let table = new AsciiTable('Método Regula Falsi');
  table.setHeading('k', 'Xk', 'f(Xk)', 'x', 'E');
  let xA = intervaloA;
  let xB = intervaloB;
  let iteracoes = 0;
  let fXA = solver(funcao, {x: xA}, 'numer').evaluate().text('decimals');
  table.addRow(iteracoes, xA, fXA, '-', '-');
  iteracoes++;
  let fXB = solver(funcao, {x: xB}, 'numer').evaluate().text('decimals');
  let xBarra = ((xA * fXB) - (xB * fXA)) / (fXB - fXA);
  let erro = Math.abs(xBarra - xB);
  table.addRow(iteracoes,xB,fXB,xBarra,erro);

  while (erro > tolerancia && iteracoes < maxIteracoes) {
    let fXBarra = solver(funcao, {x: xBarra}, 'numer').evaluate().text('decimals');
    fXA = solver(funcao, {x: xA}, 'numer').evaluate().text('decimals');
    fXB = solver(funcao, {x: xB}, 'numer').evaluate().text('decimals');
    
    iteracoes++;
    if (fXBarra * fXB < 0) {
      xA = xB;
      xB = xBarra;
    } else if (fXBarra * fXA < 0) {
      xB = xBarra;
    }  

    fXA = solver(funcao, {x: xA}, 'numer').evaluate().text('decimals');
    fXB = solver(funcao, {x: xB}, 'numer').evaluate().text('decimals');
    let tempXBarra = xBarra;
    xBarra = ((xA * fXB) - (xB * fXA)) / (fXB - fXA);
    erro = Math.abs(xBarra - tempXBarra);

    table.addRow(iteracoes,xB,fXB,xBarra,erro);
  }

  for (let i = 0; i < 5; i++) { table.setAlign(i, AsciiTable.RIGHT) }
  
  console.log(table.toString());
  console.log('Número de iterações:', iteracoes);
  console.log('Zero da função:', xBarra);
  let imgXBarra = solver(funcao, {x: xBarra}, 'numer').evaluate();
  console.log('Imagem da função no ponto:', imgXBarra.text('decimals'));
}

regulaFalsi('x-cos(x)', 0, 1, 0.001, 100);
//regulaFalsi('x^3+3*x^2+12*x+8', -5, 5, 0.0001, 100);