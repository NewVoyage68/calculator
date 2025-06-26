const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, op, b) {
    a = Number(a);
    b = Number(b);
    let returnValue;
    
    switch (op) {
        case '+':
            return add(a, b);
        case '−':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
    }
}

let a = '';
let b = '';
let op = '';
let result = '';

buttonsGenerate = [
    ['Backspace', 'Clear'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '−'],
    ['0', '.', '=', '+']
]

wrapper = document.querySelector('#wrapper');
body = document.querySelector('body');
body.addEventListener('keydown', (e) => {
    let key = e.key;
    keyButtonConversion = {'-': '−', '*': '×', '/': '÷'}
    if (key in keyButtonConversion) {
        key = keyButtonConversion[key];
    }
    [a, op, b, result] = handleClick(key, a, op, b);

    btn = document.getElementById(key);
    btn.style.border = '3px solid red';
});
body.addEventListener('keyup', (e) => {
    let key = e.key;
    keyButtonConversion = {'-': '−', '*': '×', '/': '÷'}
    if (key in keyButtonConversion) {
        key = keyButtonConversion[key];
    }

    btn = document.getElementById(key);
    btn.style.border = '1px solid gray';
});

for (const row of buttonsGenerate) {
    div = document.createElement('div');
    for (const text of row) {
        btn = document.createElement('button');
        btn.textContent = text;
        btn.id = text;

        btn.addEventListener('click', (e) => {
            [a, op, b, result] = handleClick(e.target.id, a, op, b);
        });
        btn.addEventListener('mousedown', (e) => {
            e.target.style.border = '3px solid red';
        });
        btn.addEventListener('mouseup', (e) => {
            e.target.style.border = '1px solid gray';
        });
        btn.addEventListener('mouseleave', (e) => {
            e.target.style.border = '1px solid gray';
        });

        div.appendChild(btn);
    }
    wrapper.appendChild(div);
}

function getBtnType(btnText) {
    if ('0123456789'.includes(btnText)) {
        return 'num';
    } else if ('+−×÷'.includes(btnText)) {
        return 'op';
    } else {
        return btnText;
    }
}

function calculatorDisplay(a, b, result) {
    let returnValue;
    if (result !== '') {
        returnValue = String(result);
    } else if (b === '') {
        returnValue = a;
    } else {
        returnValue = b;
    }

    if (returnValue.slice(-1) === '.') {
        return returnValue;
    } else {
        return Number(returnValue);
    }
}

function handleClick(btnText, a, op, b) {
    const btnType = getBtnType(btnText);
    const display = document.querySelector('#display');
    
    if (btnType === 'Clear') {
            a = '';
            op = '';
            b = '';
    }
    if (result !== '') {
        if (btnType === 'op' || btnType === 'Backspace') {
            a = result;
        }
        result = '';
    }
    if (op === '') {
        if (btnType === 'num') {
            a += btnText;
        }
        if (btnType === '.' && !a.includes('.')) {
            a += btnText;
        }
        if (a !== '' && a.slice(-1) !== '.' && btnType === 'op') {
            op = btnText;
        }
    } else {
        if (btnType === 'num') {
            b += btnText;
        }
        if (btnType === '.' && !b.includes('.')) {
            b += btnText;
        }
        if (btnType === 'op') {
            op = btnText;
            b = '';
        }
        if (b !== '' && btnType === '=') {
            result = String(operate(a, op, b));
            if (result === 'Infinity' || result === 'NaN') {
                alert("Don't try that!");
            }

            a = '';
            op = '';
            b = '';
        }
    }

    //Backspace
    if (btnType === "Backspace") {
        if (b !== '') {
            b = b.slice(0, -1);
        } else {
            a = a.slice(0, -1);
        }
    }

    //Number too long
    let numbersOmitted = '';

    if (a.length > 7) {
        a = a.slice(0, 7);
    }
    if (b.length > 7) {
        b = b.slice(0, 7);
    }
    if (result.length > 7) {
        result = result.slice(0, 7);
        numbersOmitted = '...';
    }
    
    display.textContent = calculatorDisplay(a, b, result) + numbersOmitted;
    return [a, op, b, result];
}