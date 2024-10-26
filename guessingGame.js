const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to display welcome message
const displayWelcomeMessage = () => {
  console.log("Welcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.");
};

// Function to ask the user a question and check the guess
const askQuestion = (correctNumber, remainingAttempts) => {
  if (remainingAttempts <= 0) {
    console.log("Sorry, you've run out of attempts. The correct number was:", correctNumber);
    rl.close();
    return;
  }

  rl.question(`Please guess the number (Attempts remaining: ${remainingAttempts}): `, (input) => {
    const guess = parseInt(input, 10);

    if (isNaN(guess)) {
      console.log("Please enter a valid number.");
    } else {
      if (guess > correctNumber) {
        console.log(`${guess} is greater than the expected number.`);
      } else if (guess < correctNumber) {
        console.log(`${guess} is less than the expected number.`);
      } else {
        console.log(`${guess} is the correct number! Congratulations!`);
        rl.close(); // End the program when the correct number is guessed
        return;
      }
    }

    // Keep asking if the guess is incorrect and there are attempts left
    askQuestion(correctNumber, remainingAttempts - 1);
  });
};

// Function to start the game based on selected difficulty
const startGame = (difficulty) => {
  const attemptsMap = {
    '1': 10, // Easy
    '2': 5,  // Medium
    '3': 3   // Hard
  };

  const attempts = attemptsMap[difficulty];

  if (!attempts) {
    console.log("Invalid difficulty level. Please select 1, 2, or 3.");
    rl.close();
    return;
  }

  const correctNumber = Math.floor(Math.random() * 100) + 1;
  askQuestion(correctNumber, attempts); // Start asking questions
};

// Main function to initiate the game
const main = () => {
  displayWelcomeMessage();

  // Ask user to select difficulty
  rl.question(`Please select the difficulty level:
1. Easy (10 attempts)
2. Medium (5 attempts)
3. Hard (3 attempts)
Please enter your choice: `, startGame);
};

// Handle exit signal
rl.on("SIGINT", () => {
  console.log("\nExiting the game...");
  rl.close();
});

// Start the game
main();