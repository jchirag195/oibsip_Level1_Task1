document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let memoryValue = 0;
    let currentInput = '';
    let operator = null;
    let firstOperand = null;
    let shouldResetDisplay = false;

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => button.addEventListener('click', handleButtonClick));

    function handleButtonClick(e) {
        const value = e.target.innerText;

        if (isNumber(value) || value === '.') {
            handleNumber(value);
        } else {
            handleOperator(value);
        }
    }

    function isNumber(value) {
        return !isNaN(value);
    }

    function handleNumber(value) {
        if (shouldResetDisplay) {
            display.value = value;
            shouldResetDisplay = false;
        } else {
            display.value = display.value === '0' ? value : display.value + value;
        }
        currentInput = display.value;
    }

    function handleOperator(value) {
        switch (value) {
            case 'AC':
                resetCalculator();
                break;
            case '=':
                if (operator !== null) {
                    display.value = calculate(firstOperand, currentInput, operator);
                    firstOperand = display.value;
                    shouldResetDisplay = true;
                    operator = null;
                }
                break;
            case '←':
                if (display.value.length === 1) {
                    display.value = '0';
                } else {
                    display.value = display.value.substring(0, -1);
                }
                currentInput = display.value;
                break;
            case '%':
                display.value = parseFloat(display.value) / 100;
                shouldResetDisplay = true;
                break;
            default:
                if (operator !== null && !shouldResetDisplay) {
                    display.value = calculate(firstOperand, currentInput, operator);
                }
                firstOperand = display.value;
                operator = value;
                shouldResetDisplay = true;
                break;
        }
    }

    function calculate(first, second, operator) {
        const firstNum = parseFloat(first);
        const secondNum = parseFloat(second);
        switch (operator) {
            case '+':
                return firstNum + secondNum;
            case '-':
                return firstNum - secondNum;
            case '*':
                return firstNum * secondNum;
            case '/':
                return firstNum / secondNum;
            default:
                return second;
        }
    }

    function resetCalculator() {
        display.value = '0';
        currentInput = '';
        firstOperand = null;
        operator = null;
        shouldResetDisplay = false;
    }
});
