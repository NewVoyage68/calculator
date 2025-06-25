const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, op, b) {
    a = Number(a);
    b = Number(b);
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

let a = '';
let b = '';
let op = '';

buttonsGenerate = [
    ['Clear'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
]

wrapper = document.querySelector('#wrapper');

for (const row of buttonsGenerate) {
    div = document.createElement('div');
    for (const text of row) {
        btn = document.createElement('button');
        btn.textContent = text;
        btn.id = text;
        btn.addEventListener('click', (e) => {
            [a, op, b] = handleClick(e.target.id, a, op, b)
        });
        div.appendChild(btn);
    }
    wrapper.appendChild(div);
}

function getBtnType(btnText) {
    if ('0123456789'.includes(btnText)) {
        return 'num';
    } else if ('+-*/'.includes(btnText)) {
        return 'op';
    } else {
        return btnText;
    }
}

function calculatorDisplay(a, b) {
    if (b === '') {
        return a;
    } else {
        return b;
    }
}

function handleClick(btnText, a, op, b) {
    const btnType = getBtnType(btnText);
    const display = document.querySelector('#display');

    if (op === '') {
        if (btnType === 'num') {
            a += btnText;
        }
        if (a !== '' && btnType === 'op') {
            op = btnText;
        }
    } else {
        if (btnType === 'num') {
            b += btnText;
        }
        if (btnType === 'op') {
            op = btnText;
            b = '';
        }
        if (b !== '' && btnType === '=') {
            a = operate(a, op, b);
            op = '';
            b = '';
        }
    }
    console.log(`${a}${op}${b}`);
    display.textContent = calculatorDisplay(a, b);
    return [a, op, b];
}