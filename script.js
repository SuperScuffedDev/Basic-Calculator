const buttons = document.querySelectorAll("button");

let current_input = [];

function input_number(input) {
    console.log("number")
};
function input_modifier(input) {
    console.log("modifier")
};
function input_operator(input) {
    console.log("operator")
};
function input_memory(input) {
    console.log("memory")
};

function input_filter(input) {
    const number = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"];
    const modifier = ["parenthesis", "exponent", "percent", "neg", "decimal"];
    const operator = ["divide", "multiply", "subract", "add", "equals"];
    const memory = ["history", "clear", "backspace"];

    if (number.includes(input.target.id)) {
        input_number(input.target.id);
    } else if (modifier.includes(input.target.id)) {
        input_modifier(input.target.id);
    } else if (operator.includes(input.target.id)) {
        input_operator(input.target.id);
    } else if (memory.includes(input.target.id)) {
        input_memory(input.target.id);
    } else {
        console.log("how tf")
    };
};

buttons.forEach(button => button.addEventListener("click", input_filter));