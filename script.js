const buttons = document.querySelectorAll("button");
const output_display = document.querySelector("#output div");
const log_msg = document.querySelector("#log");

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

let equation = [];

function update() {
    console.log(equation)

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
    if (display_text.length === 0) {
        display_text.push("0");
    };
    output_display.textContent = display_text.join("");
}

let current_step = 0;
let last_type = ""
// inputs

function find_array_by_step() {
    let step = equation;
    for (i=0; i < current_step; i++) {
        console.log(step[step.length - 1])
        if (Array.isArray(step[step.length - 1])) {
            step = step[step.length - 1];
        };
    };
    return step;
}

function input_number(input) {
    let step = find_array_by_step();
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

    if (Number.isFinite(step.at(-1))) {
        true_input = Number("" + step.at(-1) + true_input);
        step.pop(-1);
    };
    step.push(true_input);
    log_msg.textContent = `Input: ${true_input}`
};
function input_operator(input) {
    let step = find_array_by_step();

    if (typeof step.at(-1) === "string") {
        step.pop(-1);
    };

    if (typeof step.at(-1) === "number" || typeof step.at(-1) === "object") {
        switch (input) {
            case "multiply":
                step.push("M");
                log_msg.textContent = `Input: Multiply`
                break;
            case "divide":
                step.push("D");
                log_msg.textContent = `Input: Divide`
                break;
            case "add":
                step.push("A");
                log_msg.textContent = `Input: Add`
                break;
            case "subtract":
                step.push("S");
                log_msg.textContent = `Input: Subtract`
                break;
        };
    }
};
function input_modifier(input) {
    let step = find_array_by_step();
    switch (input) {
        case "parenthesis":
            if (typeof step.at(-1) === "number" || typeof step.at(-1) === "object") {
                step.push("M");
            };
            if (step.length === 0 && current_step !== 0) {
                break;
            } else {
                step.push([]);
                current_step += 1
                log_msg.textContent = `Input: Step`
            };
            break;
        case "exponent":
            equation.push("E");
                log_msg.textContent = `Input: Power`
            break;
        case "neg":
            break;
        case "decimal":
            break;
    };
};
function input_memory(input) {
    let step = find_array_by_step();
    switch (input) {
        case "pop":
            if (current_step > 0) {
                if (step.length === 0) {
                    equation.pop(step);
                    log_msg.textContent = `Input: incomplete step removed.`

                } else {
                    log_msg.textContent = `Input: Unstep`
                }
                current_step -= 1
            } else {
                log_msg.textContent = `ERROR: nothing to step out of.`
            }
            break;
        case "clear":
            equation = [];
            break;
    };
};

function solve() {
    let current_equation = equation;
    let deepest_array = []

    function power(a, b) {
        return a ** b
    }
    function multiply(a, b) {
        return a * b;
    }
    function divide(a, b) {
        return a / b;
    }
    function add(a, b) {
        return a + b;
    }
    function subtract(a, b) {
        return a - b;
    }

    function recurse_solve_deepest(array) {
        //locate the deepest(first step)
        array.forEach(value => {
            if (Array.isArray(value)) {
                recurse_solve_deepest(value);
                let new_value = value[1];
                value = new_value;
            };
        });

        //find exponent
        while (array.includes("E")) {
            let index_of_operator = array.indexOf("E");
            let new_value = power(array[index_of_operator - 1], array[index_of_operator + 1]);
            array[index_of_operator] = new_value;
            array.splice(index_of_operator + 1, 1);
            array.splice(index_of_operator - 1, 1);
        };

        //find multiply
        while (array.includes("M")) {
            let index_of_operator = array.indexOf("M");
            let new_value = multiply(array[index_of_operator - 1], array[index_of_operator + 1]);
            array[index_of_operator] = new_value;
            array.splice(index_of_operator + 1, 1);
            array.splice(index_of_operator - 1, 1);
        };

        //find divide
        while (array.includes("D")) {
            let index_of_operator = array.indexOf("D");
            let new_value = divide(array[index_of_operator - 1], array[index_of_operator + 1]);
            array[index_of_operator] = new_value;
            array.splice(index_of_operator + 1, 1);
            array.splice(index_of_operator - 1, 1);
        };

        //find add
        while (array.includes("A")) {
            let index_of_operator = array.indexOf("A");
            let new_value = add(array[index_of_operator - 1], array[index_of_operator + 1]);
            array[index_of_operator] = new_value;
            array.splice(index_of_operator + 1, 1);
            array.splice(index_of_operator - 1, 1);
        };

        //find subtract
        while (array.includes("S")) {
            let index_of_operator = array.indexOf("S");
            let new_value = subtract(array[index_of_operator - 1], array[index_of_operator + 1]);
            array[index_of_operator] = new_value;
            array.splice(index_of_operator + 1, 1);
            array.splice(index_of_operator - 1, 1);
        };
    };

    recurse_solve_deepest(current_equation);
}

function input_filter(input) {
    const number = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"];
    const operator = ["multiply", "divide", "add", "subtract"];
    const modifier = ["parenthesis", "exponent", "neg", "decimal"];
    const memory = ["pop", "clear", "backspace"];

    if (number.includes(input.target.id)) {
        input_number(input.target.id);
    } else if (operator.includes(input.target.id)) {
        input_operator(input.target.id);
    } else if (modifier.includes(input.target.id)) {
        input_modifier(input.target.id);
    } else if (memory.includes(input.target.id)) {
        input_memory(input.target.id);
    } else if (input.target.id === "equals") {
        solve()
    } else {
        console.log("how tf")
    };
    update()
};

buttons.forEach(button => button.addEventListener("click", input_filter));

update()