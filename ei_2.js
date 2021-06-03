const solver = require('nerdamer');
const AsciiTable = require('ascii-table');

function bissecao(funcao, intervaloA, intervaloB, tolerancia, maxIteracoes) {
  let table = new AsciiTable('Método da bisseção');
  table.setHeading('k','a','b','x','f(x)','E');
  let a = intervaloA;
  let b = intervaloB;
  let erro = 1;
  let iteracoes = 0;
  let x = 0;
  while (erro > tolerancia && iteracoes < maxIteracoes) {
    x = (a+b)/2;
    let fDeA = solver(funcao, {x: a}, 'numer').evaluate().text('decimals');
    let fDeB = solver(funcao, {x: b}, 'numer').evaluate().text('decimals');
    let fDeX = solver(funcao, {x: x}, 'numer').evaluate().text('decimals');
    let tempA = a;
    let tempB = b;
    if (fDeA*fDeX < 0) {
      b = x;
    } else if (fDeB*fDeX < 0) {
      a = x;
    }

    erro = Math.abs(a - b);
    table.addRow(iteracoes,tempA,tempB,x,fDeX,erro);
    if (fDeX == 0) {
      break;
    }
    iteracoes++;
  }

  console.log(table.toString());
  console.log('Número de iterações:',iteracoes);
  console.log('Zero da função:',x);
  let imgXBarra = solver(funcao, {x:x}, 'numer').evaluate();
  console.log('Imagem da função no ponto:',imgXBarra.text('decimals'));
}

//bissecao('x^2+log(x)', 0.5, 1.0, 0.01, 100);
bissecao('x^2-sin(x)', 0, 1, 0.00001, 100);