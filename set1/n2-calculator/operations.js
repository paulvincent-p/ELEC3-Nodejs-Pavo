/*
Name: Paul Vincent M. Pavo
Section: IV-BSIT-B
Activity: N2 - Calculator
Date: November 24, 2026
*/

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }

    return a / b;
}

function average(numbers) {
    if (numbers.length === 0) {
        throw new Error("Cannot calculate the average of an empty list.");
    }

    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }

    return total / numbers.length;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    average
};
