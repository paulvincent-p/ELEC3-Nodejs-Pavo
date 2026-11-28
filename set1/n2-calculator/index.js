/*
Name: Paul Vincent M. Pavo
Section: IV-BSIT-B
Activity: N2 - Calculator
Date: November 24, 2026
*/

const operations = require("./operations");
const { formatResult } = require("./formatter");

const os = require("os");
const path = require("path");

const argumentsList = process.argv.slice(2);

const operation = argumentsList[0];
const numberInputs = argumentsList.slice(1);

console.log("===== NODE.JS CALCULATOR =====");
console.log("Computer:", os.hostname());
console.log("Platform:", os.platform());
console.log("Program:", path.basename(__filename));

if (!operation || numberInputs.length === 0) {
    console.log("\nUsage:");
    console.log("node index.js add 10 5");
    console.log("node index.js subtract 10 5");
    console.log("node index.js multiply 10 5");
    console.log("node index.js divide 10 5");
    console.log("node index.js average 10 20 30");
    process.exit(1);
}

const numbers = numberInputs.map(Number);

for (let i = 0; i < numberInputs.length; i++) {
    if (numberInputs[i].trim() === "" || !Number.isFinite(numbers[i])) {
        console.log("Error: Please provide valid numeric values.");
        process.exit(1);
    }
}

let result;

try {
    switch (operation.toLowerCase()) {
        case "add":
            if (numbers.length !== 2) {
                throw new Error("Addition requires exactly two numbers.");
            }
            result = operations.add(numbers[0], numbers[1]);
            break;

        case "subtract":
            if (numbers.length !== 2) {
                throw new Error("Subtraction requires exactly two numbers.");
            }
            result = operations.subtract(numbers[0], numbers[1]);
            break;

        case "multiply":
            if (numbers.length !== 2) {
                throw new Error("Multiplication requires exactly two numbers.");
            }
            result = operations.multiply(numbers[0], numbers[1]);
            break;

        case "divide":
            if (numbers.length !== 2) {
                throw new Error("Division requires exactly two numbers.");
            }
            result = operations.divide(numbers[0], numbers[1]);
            break;

        case "average":
            result = operations.average(numbers);
            break;

        default:
            throw new Error("Unknown operation. Please use add, subtract, multiply, divide, or average.");
    }

    console.log("\n" + formatResult(operation, result));

} catch (error) {
    console.log("\nError:", error.message);
    process.exitCode = 1;
}
