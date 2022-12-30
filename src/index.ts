#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { Calculator } from "./calculator.js";
import { welcome } from "./welcome.js";

async function welcomeMessage() {
  const stringAnimate = chalkAnimation.rainbow(welcome);
  stringAnimate.start(); // animation start

  // wait for 5 seconds before stopping the animation
  await new Promise((resolve) => setTimeout(resolve, 5000));
  stringAnimate.stop();
}
// welcomeMessage();

async function user_input() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "numbers",
      message: "Enter your numbers (seperated by comma):",
      validate: function (value) {
        if (/^\d+(,\d+)*$/.test(value)) {
          return true;
        }
        return "Please enter a valid numbers seperated by comma";
      },
    },
    {
      type: "list",
      name: "operators",
      message: "Select the operator to perform calculation:",
      choices: ["+", "-", "*", "/"],
    },
  ]);
  const numbers: number[] = answer.numbers.split(",").map(Number);
  const operator: string = answer.operators;
  const obj = new Calculator(numbers);
  let result;
  switch (operator) {
    case "+":
      result = obj.add;
      break;
    case "-":
      result = obj.sub;
      break;
    case "*":
      result = obj.multiply;
      break;
    case "/":
      result = obj.divide;
      break;
  }
  return { result, numbers, operator };
}

(async () => {})();

async function startAgain() {
  do {
    console.clear();
    await welcomeMessage();
    const { result, numbers, operator } = await user_input();
    console.log(
      `${chalk.yellow(numbers.join(" " + operator + " "))} = ${chalk.green(
        result
      )}`
    );
    var tryAgain = await inquirer.prompt([
      {
        type: "confirm",
        name: "calculate",
        message: "Do You want to use calculator Again?",
        default: false,
      },
    ]);
  } while (tryAgain.calculate == true);
}
startAgain();
