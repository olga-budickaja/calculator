const output = document.querySelector(".output");
const section = document.createElement("section");
const selectFirstValue = document.createElement('div');
const selectSecondValue = document.createElement('div');


section.classList.add("keyboard");
selectFirstValue.classList.add("output__value1");
selectSecondValue.classList.add("output__value2");
document.querySelector(".calculator").append(section);
document.querySelector(".output").append(selectFirstValue);
document.querySelector(".output").append(selectSecondValue);

'C CE % / 7 8 9 * 4 5 6 - 1 2 3 + 0 00 . ='.split(' ')
    .map(btn => {
        section.insertAdjacentHTML('beforeend', `<button class="keyboard__btn keyboard__number" value="${btn}">${btn}</button>`)
    });


class Calculator {
    constructor(outputFirstValue, outputSecondValue) {
        this.outputFirstValue = outputFirstValue;
        this.outputSecondValue = outputSecondValue;
        this.getClear();
    }

    getClear() {
        this.firstValue = '';
        this.secondValue = '';
        this.operation = undefined;
    }

    getDelete() {
        this.secondValue = this.secondValue.toString().slice(0, -1);
    }

    getSelectNumber(num) {
        if (num === '.' && this.secondValue.includes('.'))
            return
        this.secondValue = this.secondValue.toString() + num.toString();
    }

    getSelectOperation(operation) {
        if (this.secondValue === '')
            return
        if(this.firstValue !== '') {
            this.getCount();
        }
        this.operation = operation;
        this.firstValue = this.secondValue;
        this.secondValue = '';
    }

    getCount() {
        let count;

        const first = parseFloat(this.firstValue);
        const second = parseFloat(this.secondValue);

        if (isNaN(first) || isNaN(second))
            return
        switch (this.operation) {
            case '+':
                count = first + second;
                break;
            case '-':
                count = first - second;
                break;
            case '*':
                count = first * second;
                break;
            case '/':
                count = first / second;
                break;
            case '%':
                count = first * second / 100;
                break
            default: return
        }
        this.secondValue = count;
        this.operation = undefined;
        this.firstValue = '';
    }

    getDisplayNumber(num) {
        const strNumber = num.toString();
        const intNumber = parseFloat(strNumber.split('.')[0]);
        const decNumber = strNumber.split('.')[1];

        let intDisplay;
        if (isNaN(intNumber)) {
            intDisplay = '';
        } else {
            intDisplay = intNumber.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decNumber != null) {
            return `${intDisplay}.${decNumber}`;
        } else {
            return intDisplay;
        }
    }

    updateOutput() {
        this.outputSecondValue.innerText = this.getDisplayNumber(this.secondValue);
        console.log(this.outputSecondValue.value)
        if (this.operation != null) {
            this.outputFirstValue.innerText = `${this.getDisplayNumber(this.firstValue)} ${this.operation}`;
        } else {
            this.outputFirstValue.innerText = '';
        }
    }

}



document.querySelectorAll('button:nth-child(4n + 4), button:nth-child(3)').forEach(btn => {btn.classList.add("keyboard__operation");});
document.querySelectorAll('button:nth-child(4n + 4), button:nth-child(3)').forEach(btn => {btn.classList.remove("keyboard__number");});
document.querySelector('button:nth-child(1)').classList.add("keyboard__delete");
document.querySelector('button:nth-child(2)').classList.add("keyboard__reset");
document.querySelector('button:nth-child(1)').classList.remove("keyboard__number");
document.querySelector('button:nth-child(2)').classList.remove("keyboard__number");
document.querySelector('button:last-child').classList.add("keyboard__result");
document.querySelector('button:last-child').classList.remove("keyboard__number");
document.querySelector('button:last-child').classList.remove("keyboard__operation");


let operationButtons = document.querySelectorAll(".keyboard__btn.keyboard__operation");
let deleteButton = document.querySelector(".keyboard__btn.keyboard__delete");
let resetButton = document.querySelector(".keyboard__btn.keyboard__reset");
let resultButton = document.querySelector("button:last-child.keyboard__btn");
let numberButtons = document.querySelectorAll(".keyboard__btn.keyboard__number");
let outputFirstValue = document.querySelector(".output__value1");
let outputSecondValue = document.querySelector(".output__value2");

const calculator = new Calculator(outputFirstValue, outputSecondValue);


numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.getSelectNumber(btn.value);
        calculator.updateOutput();
    });
});

operationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.getSelectOperation(btn.value);
        calculator.updateOutput();
    })
});

deleteButton.addEventListener('click', btn => {
    calculator.getClear();
    calculator.updateOutput();
});

resultButton.addEventListener('click', btn => {
    calculator.getCount();
    calculator.updateOutput();
});


resetButton.addEventListener('click', btn => {
    calculator.getDelete();
    calculator.updateOutput();
})

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener('click',function () {
        btn.classList.add('click');
        setTimeout(function () {
            btn.classList.remove('click');
        }, 500);
    });
});

document.addEventListener('keydown', function(event) {
    let patNumbers = /[0-9]/g;
    let patOperation = /[+\-*\/]/g;

    if (event.key.match(patNumbers)) {
        event.preventDefault();
        calculator.getSelectNumber(event.key);
        calculator.updateOutput();
    }
    if (event.key === '.') {
        event.preventDefault();
        calculator.getSelectNumber(event.key);
        calculator.updateOutput();
    }
    if (event.key.match(patOperation)) {
        event.preventDefault();
        calculator.getSelectOperation(event.key);
        calculator.updateOutput();
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.getCount();
        calculator.updateOutput();
    }
    if (event.key === 'Backspace') {
        event.preventDefault();
        calculator.getDelete();
        calculator.updateOutput();
    }
    if (event.key === 'Delete') {
        event.preventDefault();
        calculator.getClear();
        calculator.updateOutput();
    }
});


// Theme

const themeButton = document.querySelector(".header__btn-theme");
const body = document.querySelector("body");

const currentTheme = localStorage.getItem("theme");
let theme = "white";

themeButton.addEventListener('click', toggleTheme);

if (currentTheme == "dark") {
    body.classList.add("dark");
    themeButton.classList.add("on");
}

function toggleTheme() {
    body.classList.toggle("dark");
    themeButton.classList.toggle("on");

    if (body.classList.contains("dark")) {
        theme = "dark";
    }

    localStorage.setItem("theme", theme);
}







