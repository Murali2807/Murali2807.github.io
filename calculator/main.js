class Calculator {
  constructor(preOperandText, curOperandText) {
    this.preOperandText = preOperandText;
    this.curOperandText = curOperandText;
    this.allClear();
  }

  update() {
    this.curOperandText.innerText = this.getNumberWithCommaDisplay(this.curOperand);
    if(this.operation != null){
        this.preOperandText.innerText = `${this.getNumberWithCommaDisplay(this.preOperand)} ${this.operation}`;
    } else {
      this.preOperandText.innerText = '';
    }
  }

  appendNum(number) {
    if (number === "." && this.curOperand.includes(".")) return;
    this.curOperand = this.curOperand.toString() + number.toString();
  }

  chooseOper(oper) {
    if (this.curOperand === "") return;
    if (this.preOperand !== "") {
      this.computeTwoNumber();
    }
    this.operation = oper;
    this.preOperand = this.curOperand;
    this.curOperand = "";
  }

  computeTwoNumber() {
    let calculation;
    const pre = parseFloat(this.preOperand);
    const cur = parseFloat(this.curOperand);
    if (isNaN(pre) || isNaN(cur)) return;

    switch (this.operation) {
      case "+":
        calculation = pre + cur;
        break;
      case "-":
        calculation = pre - cur;
        break;
      case "*":
        calculation = pre * cur;
        break;
      case "/":
        calculation = pre / cur;
        break;
      default:
        return;
    }
    this.curOperand = calculation;
    this.operation = undefined;
    this.preOperand = "";
  }

  allClear() {
    this.curOperand = "";
    this.preOperand = "";
    this.operation = undefined;
  }

  deleteOnce() {
    this.curOperand = this.curOperand.toString().slice(0,-1);
  }
  getNumberWithCommaDisplay(number){
    const stringNumber = number.toString();
    const integerSideNumber = parseFloat(stringNumber.split('.')[0]);
    const decimalSideNumber = stringNumber.split('.')[1];
    let finalIntegerNumber;

    if(isNaN(integerSideNumber)){
      finalIntegerNumber = '';
    } else {
      finalIntegerNumber = integerSideNumber.toLocaleString('en',{
        maximumFractionDigits:0});
    }
      if(decimalSideNumber != null){
        return `${finalIntegerNumber}.${decimalSideNumber}`;
      }else {
        return finalIntegerNumber;
      }
    
    return number;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-allclear]");
const preOperandText = document.querySelector("[data-pre-operand]");
const curOperandText = document.querySelector("[data-cur-operand]");

const calculator = new Calculator(preOperandText, curOperandText);

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.appendNum(button.innerText);
    calculator.update();
  });
});

operationButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.chooseOper(button.innerText);
    calculator.update();
  });
});

equalButton.addEventListener("click",function (button){
  calculator.computeTwoNumber();
  calculator.update();
})

allClearButton.addEventListener("click", function (button) {
  calculator.allClear();
  calculator.update();
});

deleteButton.addEventListener("click", function (button) {
  calculator.deleteOnce();
  calculator.update();
});
