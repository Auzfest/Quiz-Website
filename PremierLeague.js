// Quiz questions array
const quizQuestions = [
  {
    question: "1. Which club has won the most Premier League titles?",
    options: ["Manchester United", "Chelsea", "Manchester City", "Liverpool"],
    answer: "Manchester United"
  },
  {
    question: "2. Which club holds the record for the most consecutive Premier League titles?",
    options: ["Manchester United", "Arsenal", "Chelsea", "Liverpool"],
    answer: "Manchester United"
  },
  {
    question: "3. Which club won the first-ever Premier League season in 1992-1993?",
    options: ["Manchester United", "Arsenal", "Liverpool", "Blackburn Rovers"],
    answer: "Manchester United"
  },
  {
    question: "4. Which club holds the record for the most points in a single Premier League season?",
    options: ["Manchester City", "Liverpool", "Chelsea", "Arsenal"],
    answer: "Manchester City"
  },
  {
    question: "5. Which club famously went unbeaten in the entire 2003-2004 Premier League season?",
    options: ["Manchester United", "Chelsea", "Liverpool", "Arsenal"],
    answer: "Arsenal"
  },
  {
    question: "6. Which club has the highest number of top-flight league titles in England?",
    options: ["Manchester United", "Liverpool", "Arsenal", "Everton"],
    answer: "Liverpool"
  },
  {
    question: "7. Which club has won the most FA Cup titles in England?",
    options: ["Manchester United", "Arsenal", "Chelsea", "Liverpool"],
    answer: "Arsenal"
  },
  {
    question: "8. Which club is known as 'The Red Devils'?",
    options: ["Manchester United", "Liverpool", "Manchester City", "Chelsea"],
    answer: "Manchester United"
  },
  {
    question: "9. Which club is nicknamed 'The Gunners'?",
    options: ["Manchester United", "Liverpool", "Arsenal", "Chelsea"],
    answer: "Arsenal"
  },
  {
    question: "10. Which club has won the most consecutive League Cup titles?",
    options: ["Manchester United", "Liverpool", "Manchester City", "Chelsea"],
    answer: "Manchester City"
  }
];
  
let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const questionContainer = $("#question-container");
const questionElement = $("#question");
const optionsElement = $("#options");
const submitButton = $("#submit-btn");
const scoreContainer = $("#score-container");
const scoreElement = $("#score");
const restartButton = $("#restart-btn");

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.text(currentQuestion.question);

  optionsElement.empty();
  currentQuestion.options.forEach((option, index) => {
    const optionElement = $(`
      <div>
        <input type="radio" name="answer" value="${option}" id="option${index + 1}">
        <label for="option${index + 1}">${option}</label>
      </div>
    `);
    optionsElement.append(optionElement);
  });

  questionContainer.show();
}

function checkAnswer() {
  const selectedOption = $("input[name='answer']:checked");
  if (selectedOption.length) {
    const userAnswer = selectedOption.val();
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // If answer is correct add a point
    if (userAnswer === currentQuestion.answer) {
      optionsElement.html(`${currentQuestion.answer} is correct!`);
      score++;
      scoreElement.text(score);
    } else {
      optionsElement.html(`Sorry that's wrong. ${currentQuestion.answer} is the correct answer!`);
    }

    // Move to the next question or end the quiz if done
    currentQuestionIndex++;
    selectedOption.prop("checked", false);

    if (currentQuestionIndex < quizQuestions.length) {
      setTimeout(displayQuestion, 3000);
    } else {
      setTimeout(showFinalScore, 3000);
    }
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.text(score);
  questionContainer.show();
  displayQuestion();
}

function showFinalScore() {
  questionContainer.hide();
  scoreContainer.show();
  scoreElement.text(score);
}

$(document).ready(function() {
  // Event listeners for buttons
  submitButton.click(checkAnswer);
  restartButton.click(restartQuiz);
});

// Start here and display the first question
displayQuestion();