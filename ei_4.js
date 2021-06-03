const solver = require('nerdamer');
const AsciiTable = require('ascii-table');

function newtonConstante(funcao, primDerivada, segDerivada, intervaloA, intervaloB, tolerancia, maxIteracoes) {
  let table = new AsciiTable('Método de Newton com derivada constante');
  table.setHeading('k', 'Xk', 'f(Xk)', 'f\'(Xk)', 'x', 'E');
  let fDeA = solver(funcao, {x: intervaloA}, 'numer').evaluate().text('decimals');
  let fLinhaLinhaDeA = solver(segDerivada, {x: intervaloA}, 'numer').evaluate().text('decimals');
  let multA = fDeA * fLinhaLinhaDeA;
  let fDeB = solver(funcao, {x: intervaloB}, 'numer').evaluate().text('decimals');
  let fLinhaLinhaDeB = solver(segDerivada, {x: intervaloB}, 'numer').evaluate().text('decimals');
  let multB = fDeB * fLinhaLinhaDeB;

  let x = 0;
  if (multA > 0) {
    x = intervaloA;
  } else {
    x = intervaloB;
  }

  let fLinhaDeX = solver(primDerivada, {x:x}, 'numer').evaluate();
  let iteracoes = 0;
  let erro = 1;
  while ((iteracoes < maxIteracoes) && (erro > tolerancia)) {
    let fDeX = solver(funcao, {x:x}, 'numer').evaluate();
    let xBarra = x - (fDeX / fLinhaDeX);
    erro = Math.abs(xBarra - x);

    table.addRow(iteracoes, x, fDeX.text('decimals'), fLinhaDeX.text('decimals'), xBarra, erro);
    x = xBarra;
    iteracoes++;
  }
  console.log(table.toString());
  console.log('Número de iterações:', iteracoes);
  console.log('Zero da função:', x);
  let imgXBarra = solver(funcao, {x:x}, 'numer').evaluate();
  console.log('Imagem da função no ponto:', imgXBarra.text('decimals'), '\n');
}

// newtonConstante('x^2-3', '2x', '2', 1, 2, 0.01, 100);
// newtonConstante('x^2 + log(x)', '2x+(1/x)', '2-(1/x^2)', 0.5, 1, 0.01, 100);
// newtonConstante('4cos(x)-e^x', '-4sin(x)-e^x', '-4cos(x)-e^x', 0, 1, 0.01, 100);
newtonConstante('cos(x)-3+e^x', 'e^x-sin(x)', 'e^x-cos(x)', 0, 1, 0.0000001, 100);