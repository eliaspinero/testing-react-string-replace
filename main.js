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

function replace({baseText, searchText , replaceText = '', options = {}, replaceIndexes}){

    const _options = {beforeMatch: '', afterMatch: '', beforeReplace: '', afterReplace: '', ...options};

    let index = -1;

    const replacedText = reactStringReplace(baseText, searchText, (match) => {
      index++;
      if (!replaceIndexes) return match;
      if (replaceIndexes === 'all' || replaceIndexes === index || (Array.isArray(replaceIndexes) && replaceIndexes.includes(index))) return replaceText;
      return match;
    }).join('');

    const occurrencesSource = reactStringReplace(replacedText, searchText, (match, i) => {
    if (replaceText) {
      return `${_options.beforeMatch}${match}${_options.afterMatch}${_options.beforeReplace}${replaceText}${_options.afterReplace}`;
    } else {
      return `${_options.beforeMatch}${match}${_options.afterMatch}`;
    }
  });
  function getOccurrences(occurrencesSource) {
    const references = [];
    for (let i = 0; i < occurrencesSource.length; i+=2) {
      if (occurrencesSource[i+1]){
        const element = occurrencesSource[i+0]?.slice(-10) + occurrencesSource[i+1] + occurrencesSource[i+2]?.slice(0,10); 
        references.push(element);
      }
    };
    return references;
  };
  return {replacedText, occurrences: getOccurrences(occurrencesSource)};
};

const auxiliar = replace({baseText:text, searchText:'adopción', replaceText: '!texto!', replaceIndexes: [0, 2], options:{beforeMatch: 'HHHHHHHH'}});
console.log(auxiliar);

console.log(auxiliar.replacedText);


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
