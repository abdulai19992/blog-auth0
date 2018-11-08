var myHeaders = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json"
});

fetch("http://localhost:5000/quiz-questions", {
  headers: myHeaders
})
  .then(response => {
    return response.json();
  })
  .then(data => {
    let results = data.results;
    (function() {
      function buildQuiz() {
        const output = [];

        results.forEach((currentQuestion, questionNumber) => {
          const answers = [];

          for (letter in currentQuestion.answers) {
            answers.push(
              `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${currentQuestion.answers[letter]}
          </label><br />`
            );
          }

          output.push(
            `<div class="question"><h4> ${currentQuestion.question} </h4></div>
        <div class="answers"><h6> ${answers.join("")} </h6></div>`
          );
        });

        quizContainer.innerHTML = output.join("");
      }

      function showResults() {
        const answerContainers = quizContainer.querySelectorAll(".answers");

        let numCorrect = 0;

        results.forEach((currentQuestion, questionNumber) => {
          const answerContainer = answerContainers[questionNumber];
          const selector = `input[name=question${questionNumber}]:checked`;
          const userAnswer = (answerContainer.querySelector(selector) || {})
            .value;

          if (userAnswer === currentQuestion.correct_answer) {
            numCorrect++;

            answerContainers[questionNumber].style.color = "lightgreen";
          } else {
            answerContainers[questionNumber].style.color = "red";
          }
        });

        resultsContainer.innerHTML = `${numCorrect} out of ${results.length}`;
      }

      const quizContainer = document.getElementById("quiz");
      const resultsContainer = document.getElementById("results");
      const submitButton = document.getElementById("submit");
      $(document).ready(function() {
        let $jumbotron = $(".jumbotron");
        var $start = $("#start");

        $jumbotron.hide();
        $start.click(function() {
          $jumbotron.fadeIn();
          $(this).hide();
        });
        buildQuiz();

        submitButton.addEventListener("click", showResults);
      });
    })();
  });
