// Quiz questions array
const quizQuestions = [
    {
    question: "1. Who is the leader of the Separatist Alliance?",
    options: ["General Grievous", "Count Dooku", "Asajj Ventress", "Darth Maul"],
    answer: "Count Dooku"
    },
    {
    question: "2. What is the name of Anakin Skywalker's Padawan?",
    options: ["Ahsoka Tano", "Shaak Ti", "Barriss Offee", "Luminara Unduli"],
    answer: "Ahsoka Tano"
    },
    {
    question: "3. Which planet is the home of the Nightsisters?",
    options: ["Ryloth", "Mandalore", "Dathomir", "Naboo"],
    answer: "Dathomir"
    },
    {
    question: "4. Who commands the 501st Legion?",
    options: ["Commander Fox", "Commander Cody", "Commander Wolffe", "Captain Rex"],
    answer: "Captain Rex"
    },
    {
    question: "5. Who is the general of the 104th legion?",
    options: ["Obi-Wan Kenobi", "Fox", "Wolffe", "Plo Koon"],
    answer:  "Plo Koon"
    },
    {
    question: "6. Who is Darth Maul's brother?",
    options: ["Obi-Wan Kenobi", "Savage Oppress", "Count Dooku", "General Grievous"],
    answer:  "Savage Oppress"
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
  scoreContainer.hide();
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
  