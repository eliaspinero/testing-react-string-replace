import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import reactStringReplace from 'react-string-replace'

const text = `adopción

## Definición

El término “adopción” se refiere al proceso de alguien legalmente convertirse en el hijo de personas que no son sus padres biológicos.

* La Biblia usa “adopción” y “adoptar” en un sentido figurado para describir como Dios convierte a las personas en parte de su familia, haciéndolos sus hijos espirituales.
* Como hijos adoptados, los creyentes son coherederos con Jesucristo, teniendo el derecho de todos los privilegios de los hijos de Dios.

## Sugerencias de traducción

* Este término puede ser traducido con un término que el lenguaje de la traducción utilice para describir esta relación especial entre padres e hijos. Asegúrese que sea entendido que esto tiene un significado figurado o espiritual.
* La frase “experimentar la adopción como hijos” puede ser traducida como “ser adoptados por Dios como sus hijos” o “convertirse en Hijos de Dios”.`;

function replace({baseText, searchText , replaceText = false, antesMatch = '', despuesMatch = '', antesReplace = '', despuesReplace = ''}){
    const newText = reactStringReplace(baseText, searchText, (match, i) => {
    if (replaceText) {
      return `${antesMatch}${match}${despuesMatch}${antesReplace}${replaceText}${despuesReplace}`;
    } else { 
      return `${antesMatch}${match}${despuesMatch}`; 
    }   
  });
  function fullText(newText) {
    const references = [];
    for (let i = 0; i < newText.length; i+=2) {
      if (newText[i+1]){
        const element = newText[i+0]?.slice(-10) + newText[i+1] + newText[i+2]?.slice(0,10); 
        references.push(element);
      }
    };
    return references;
  };
  console.log(fullText(newText));
  return newText;
};

console.log(replace({baseText:text, searchText:'adopc', antesMatch:'MATCH:', despuesMatch:',', antesReplace:'REPLACE:', despuesReplace:'.', replaceText:'REPLACING'}));


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
