const buttons = document.querySelectorAll("button");
const output_display = document.querySelector("#output div")

// (1*6+5) + (13 / 14 - (123 / 6^5)) 
// let equation = {
//     value_1: {
//         value_1: 1,
//         operator_1: "M",
//         value_2: 6,
//         operator_2: "A",
//         value_3: 5
//     },
//     operator_2: "A",
//     value_2: {
//         value_1: 13,
//         operator_1: "D",
//         value_2: 14,
//         operator_2: "S",
//         value_3: {
//             value_1: 123,
//             operator_1: "D",
//             value_2: {
//                 value_1: 6,
//                 operator_1: "E",
//                 value_2: 5
//             }
//         }
//     }
// };

let equation = [
    [1, "M", 6, "A", 5], "A", [13, "D", 14, "S", [123, "D", [6, "E", 5]]]
];

function update() {

    let display_text = [];
    function recurse(array) {
        array.forEach(value => {
            if (Array.isArray(value)) {
                display_text.push("(")
                recurse(value)
                display_text.push(")")
            };
            if (Number.isFinite(value)) {
                display_text.push(value);
                return
            } else {
                switch (value) {
                    case "E":
                        display_text.push(" ^ ");
                        break;
                    case "M":
                        display_text.push(" x ");
                        break;
                    case "D":
                        display_text.push(" / ");
                        break;
                    case "A":
                        display_text.push(" + ");
                        break;
                    case "S":
                        display_text.push(" - ");
                        break;
                };
            };
        });
    };
    
    recurse(equation);
    console.log(equation)
    console.log(display_text);
    if (display_text.length === 0) {
        display_text.push("0");
    };
    output_display.textContent = display_text.join("");
}

function add() {}

// inputs
function input_number(input) {
    console.log(input);
    let true_input = 0;
    switch (input) {
        case "one":
            true_input = 1;
            break;
        case "two":
            true_input = 2;
            break;
        case "three":
            true_input = 3;
            break;
        case "four":
            true_input = 4;
            break;
        case "five":
            true_input = 5;
            break;
        case "six":
            true_input = 6;
            break;
        case "seven":
            true_input = 7;
            break;
        case "eight":
            true_input = 8;
            break;
        case "nine":
            true_input = 9;
            break;
        case "zero":
            true_input = 0;
            break;
    };

    if (Number.isFinite(equation.at(-1))) {
        true_input = Number("" + equation.at(-1) + true_input);
        equation.pop(-1);
    };
    equation.push(true_input);
};
function input_operator(input) {
    if (typeof equation.at(-1) === "string") {
        equation.pop(-1);
    };

    switch (input) {
        case "multiply":
            equation.push("M");
            break;
        case "divide":
            equation.push("D");
            break;
        case "add":
            equation.push("A");
            break;
        case "subtract":
            equation.push("S");
            break;
    };
};
function input_modifier(input) {
    console.log("modifier")
};
function input_memory(input) {
    switch (input) {
        case "clear":
            equation = []
    };
};

function input_filter(input) {
    const number = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"];
    const operator = ["multiply", "divide", "add", "subtract"];
    const modifier = ["parenthesis", "exponent", "neg", "decimal"];
    const memory = ["history", "clear", "backspace"];

    if (number.includes(input.target.id)) {
        input_number(input.target.id);
    } else if (operator.includes(input.target.id)) {
        input_operator(input.target.id);
    } else if (modifier.includes(input.target.id)) {
        input_modifier(input.target.id);
    } else if (memory.includes(input.target.id)) {
        input_memory(input.target.id);
    } else if (input.target.id === "equals") {
        // solve
    } else {
        console.log("how tf")
    };
    update()
};

buttons.forEach(button => button.addEventListener("click", input_filter));

update()