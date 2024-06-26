/* Desenvolva sua lógica aqui */



function registerListeners() {
  const buttonInserir = document.querySelector('.buttonBrand')
  const modalController = document.querySelector('.modalController')

  buttonInserir.addEventListener('click', () => {
    const valorInserido = document.querySelector('#valorInserido')

    const tipoTransacao = document.querySelector('.selected').value

    insertElementList(valorInserido.value, tipoTransacao);

    resetInputs()
    modalController.close()
  })

  const transactionSaida = document.querySelector('#buttonTransactionSaida');
  transactionSaida.addEventListener('click', setSelectedButton);

  const transactionEntrada = document.querySelector('#buttonTransactionEntrada');
  transactionEntrada.addEventListener('click', setSelectedButton);

  const buttonFilterEntrada = document.querySelector('.buttonFilterEntrada');
  buttonFilterEntrada.addEventListener('click', setFiltredButton)

  const buttonFilterSaida = document.querySelector('.buttonFilterSaida');
  buttonFilterSaida.addEventListener('click', setFiltredButton)

  const buttonFilterAll = document.querySelector('.buttonFilterAll');
  buttonFilterAll.addEventListener('click', setFiltredButton)

}
registerListeners();

function setSelectedButton(event) {
  const findSelected = document.querySelector('.selected');
  if (findSelected !== null) {
    findSelected.classList.remove('selected')
  }

  event.target.classList.add('selected')
}


function resetInputs() {
  const valorInserido = document.querySelector('#valorInserido')
  valorInserido.value = ''

  const findSelected = document.querySelector('.selected');
  if (findSelected !== null) {
    findSelected.classList.remove('selected')
  }

}

import { insertedValues, valuesCategory } from './valuesDatabase.js';

function insertElementList(value, tipoTransacao) {
  const identifyMaxID = insertedValues.map(elementList => elementList.id)
  let newID = 1
  if(Math.max(...identifyMaxID) >= 0){
    newID = Math.max(...identifyMaxID) + 1
  }

  const numberValue = Number(value)

  let categoryTransaction = ''
  if (tipoTransacao == 'Entrada') {
    categoryTransaction = 0
  } else {
    categoryTransaction = 1
  }

  const newInsertedElement = {
    id: newID,
    value: numberValue,
    categoryID: categoryTransaction,
  }
  insertedValues.push(newInsertedElement)
  render(insertedValues)
}

const numberInReal = new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'});

function render(list) {
  const removingDiv = document.querySelectorAll('.valoresTransacao')
  removingDiv.forEach(list => list.remove())

  list.forEach(element => {
    const containerValores = document.querySelector('.valores')
    const divContainerTransacao = document.createElement('div')
    divContainerTransacao.classList.add('valoresTransacao')
    divContainerTransacao.id = element.id
    containerValores.appendChild(divContainerTransacao)

    const valorTransacao = document.createElement('p')
    const valorInserido = document.createTextNode(numberInReal.format(element.value))
    valorTransacao.appendChild(valorInserido)
    divContainerTransacao.appendChild(valorTransacao)

    const divContainerTipo = document.createElement('div')
    divContainerTransacao.appendChild(divContainerTipo)

    const pTipoTransacao = document.createElement('p')
    const nodePTipoTransacao = document.createTextNode(valuesCategory[element.categoryID])
    pTipoTransacao.appendChild(nodePTipoTransacao)
    pTipoTransacao.classList.add('tipoTransacao')
    divContainerTipo.appendChild(pTipoTransacao)

    const imgTransacao = document.createElement('img')
    imgTransacao.src = './src/assets/Component 2Lixeira.png'
    imgTransacao.classList.add('lixeira')
    divContainerTipo.appendChild(imgTransacao)
    imgTransacao.addEventListener('click',() => removeTransactionAtIndex(element.id))
  })

  const somaValores = document.querySelector('.somaTotal')
  somaValores.innerHTML = numberInReal.format(sumValue())

}
render(insertedValues)

function sumValue (){
  let sumTotal = 0
  let sumElement = []
  insertedValues.forEach (element => {
    if(element.categoryID == 1){
      sumElement.push(-element.value)
    } else {
      sumElement.push(element.value)
    }
  })
  if (sumElement.length >= 2){
    sumElement.reduce((total, num) => sumTotal = total + num)
  } else {
    sumTotal = Number(sumElement) 
  }

  return sumTotal
}
sumValue()

function removeTransactionAtIndex(ID) {
  let removedIndex = insertedValues.findIndex(element => element.id == ID)
  insertedValues.splice(removedIndex, 1);

  render(insertedValues);
}

function setFiltredButton (event) {
  const findFiltred = document.querySelector('.filtred')
  if (findFiltred !== null){
    findFiltred.classList.remove('filtred')
  }

  event.target.classList.add('filtred')
  renderFiltredButton()
}

function renderFiltredButton (){
  const findFiltred = document.querySelector('.filtred')

  if (findFiltred.value == valuesCategory[0]){
    const filteredElementEntrada = insertedValues.filter(element => element.categoryID == 0)
    render(filteredElementEntrada)
  } else if (findFiltred.value == valuesCategory[1]){
    const filteredElementSaida = insertedValues.filter(element => element.categoryID == 1)
    render(filteredElementSaida)
  } else if (findFiltred.value == 'All'){
    render(insertedValues)
  }
}
