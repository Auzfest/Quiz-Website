    // Quiz questions array
    const quizQuestions = [
      {
        question: "1. What degree is Austin going for?",
        options: ["A. Computer Science", "B. Software Engineering", "C. Computer Information Technology", "D. All of the above"],
        answer: "B. Software Engineering"
      },
      {
        question: "2. What programming languages does Austin know?",
        options: ["A. JavaScript", "B. Python", "C. C#", "D. All of the above"],
        answer: "D. All of the above"
      },
      {
        question: "3. Which Movie series is Austin's favorite?",
        options: ["A. Star Wars", "B. Harry Potter", "C. Fast and Furious", "D. Lord of the Rings"],
        answer: "A. Star Wars"
      },
      {
        question: "4. ?",
        options: ["A. ", "B. ", "C. ", "D. "],
        answer: "C. "
      },
      {
        question: "5. ?",
        options: ["A. ", "B. ", "C. ", "D. "],
        answer:  "D. "
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
