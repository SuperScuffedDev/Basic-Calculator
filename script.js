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
            if (Number.isInteger(value)) {
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
    output_display.textContent = display_text.join("");
}



function add() {}

// inputs
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
    const modifier = ["parenthesis", "exponent", "neg", "decimal"];
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

update()