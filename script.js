let lastOperationSuccessful = true; 

function addValue(value) {
    const screen = document.getElementById("screen");
        if (!lastOperationSuccessful) {
        screen.value = "";
        lastOperationSuccessful = true; 
    }
    
    screen.value += value; 
}

function clearOutput() {
    const screen = document.getElementById("screen");
    screen.value = "";
    lastOperationSuccessful = true; 
}

function cal() {
    const screen = document.getElementById("screen");
        handleRepeatedEquals();
    try {
        if (screen.value) {
            if (isExpressionComplete(screen.value)) {
                const result = safeEval(screen.value);
                screen.value = result;
                lastOperationSuccessful = true; 
            } else {
                screen.value = "Incomplete Expression";
                lastOperationSuccessful = false; 
            }
        }
    } catch (error) {
        screen.value = "Error";
        lastOperationSuccessful = false; 
    }
}

function safeEval(expr) {
    if (expr.includes('/0')) {
        throw new Error("Division by zero");
    }
    return Function('"use strict";return (' + expr + ')')();
}

function isExpressionComplete(expr) {
    const lastChar = expr.trim().slice(-1);
    return !['+', '-', '*', '/'].includes(lastChar);
}

function handleRepeatedEquals() {
    const screen = document.getElementById("screen");
    if (!lastOperationSuccessful) {
        screen.value = "Error: Invalid Operation";
    }
}