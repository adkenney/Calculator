class Calculator {
  constructor(display){
    this.display = display;
    this.clear();
  }
  clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation){
    if(this.currentOperand === '') return
    if(this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
  compute(){
    let result;
    const prev = parseFloat(this.previousOperand);               const current = parseFloat(this.currentOperand);

    if(isNaN(prev) || isNaN(current)) return

    switch(this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperation = '';
  }
  updateDisplay(){
    this.display.innerText = this.currentOperand;
  }
}

const numButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const display = document.querySelector('#display');

const calculator = new Calculator(display);

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

opButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});
