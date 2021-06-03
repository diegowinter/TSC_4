// @ts-nocheck
import functionPlot from "function-plot";
import React, { useState } from "react";
import ReactDOM from "react-dom";

let contentsBounds = document.body.getBoundingClientRect();
let width = 500;
let height = 200;
let ratio = contentsBounds.width / width;
width *= ratio;
height *= ratio;

const Element = () => {
  const [funcao, setState] = useState('');

  function atualizarGrafico() {
    try {
      functionPlot({
        target: "#root",
        width,
        height,
        grid: true,
        data: [
          {
            fn: funcao,
          }
        ]
      });
    } catch (e) {
      alert('Verifique a função digitada.')
    }
  }

  return (<div>
    <input type='text' placeholder='Digite uma função aqui' onChange={(e) => setState(e.target.value)}></input>
    <button onClick={atualizarGrafico}>Ver gráfico</button>
  </div>)
} 
ReactDOM.render(
  <Element/>,
  document.getElementById('root')
);