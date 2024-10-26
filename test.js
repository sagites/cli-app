const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the Number Guessing Game!");
console.log("I'm thinking of a number between 1 and 100.");

// Function that asks the question and checks the user's guess
const askQuestion = (correctNumber, remainingAttempts) => {
  if (remainingAttempts <= 0) {
    console.log("Sorry, you've run out of attempts.");
    rl.close();
    return;
  }

  rl.question(`Please guess the number (Attempts remaining: ${remainingAttempts}): `, (input) => {
    const guess = parseInt(input, 10);

    if (isNaN(guess)) {
      console.log("Please enter a valid number.");
    } else if (guess > correctNumber) {
      console.log(`${guess} is greater than the expected number.`);
    } else if (guess < correctNumber) {
      console.log(`${guess} is less than the expected number.`);
    } else {
      console.log(`${guess} is the correct number! Congratulations!`);
      rl.close();
      return;
    }

    askQuestion(correctNumber, remainingAttempts - 1);
  });
};

// Function to start the game based on selected difficulty
const startGame = (difficulty) => {
  let attempts;

  // Determine number of attempts based on difficulty
  switch (difficulty) {
    case '1':
      attempts = 10; // Easy
      break;
    case '2':
      attempts = 5; // Medium
      break;
    case '3':
      attempts = 3; // Hard
      break;
    default:
      console.log("Invalid difficulty level. Please select 1, 2, or 3.");
      rl.close();
      return;
  }

  const correctNumber = Math.floor(Math.random() * 100) + 1;
  askQuestion(correctNumber, attempts); // Start asking questions
};

// Ask user to select difficulty
rl.question(`Please select the difficulty level:
1. Easy (10 attempts)
2. Medium (5 attempts)
3. Hard (3 attempts)
Please enter your choice: `, (selection) => {
  startGame(selection);
});

rl.on("SIGINT", () => {
  console.log("\nExiting the game...");
  rl.close();
});
