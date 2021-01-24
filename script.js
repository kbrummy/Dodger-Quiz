//Variables:
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var sec = 60;
var time;
var questions = [
  {
    question:
      "On April 18, 1958, The Dodgers baseball club, formerly from the Flatbush section of Brooklyn in New York, played their first game on the Pacific Coast as the Los Angeles Dodgers. What venue served as the site for the opening day game?",
    answers: {
      a: "StubHub Center",
      b: "Los Angeles Coliseum",
      c: "Petco Park",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Which former Red Sox player wore the number 99 for the Dodgers in 2009?",
    answers: {
      a: "Andre Ethier",
      b: "Juan Pierre",
      c: "Manny Ramirez",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Who was the manager of the 1963 and 1965 Los Angeles Dodgers championship teams?",
    answers: {
      a: "Walter Alston",
      b: "Leo Durocher",
      c: "Tommy Lasorda",
    },
    correctAnswer: "a",
  },
  {
    question: "Where did the Dodgers play before Los Angeles?",
    answers: {
      a: "Baltimore",
      b: "St Luis",
      c: "Brooklyn",
    },
    correctAnswer: "c",
  },
  {
    question:
      "When right fielder, Shawn Green, broke the Dodgers franchise record, in 2001, for most homeruns in a season, whose record did he beat?",
    answers: {
      a: "Mike Piazza",
      b: "Gary Sheffield",
      c: "Duke Snider",
    },
    correctAnswer: "b",
  },
  {
    question: "Dodger Stadium is located in which Los Angeles park?",
    answers: {
      a: "Elysian Park",
      b: "Exposition Park",
      c: "Palisades Park",
    },
    correctAnswer: "a",
  },
  {
    question: "What team was not in the Dodgers division in 2006?",
    answers: {
      a: "New York Mets",
      b: "St Louis Cardinals",
      c: "New York Yankees",
    },
    correctAnswer: "c",
  },
  {
    question: "The nickname 'Dodgers' originally referred to dodging ------?",
    answers: {
      a: "Horse droppings",
      b: "Police",
      c: "Trolleys",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Which Dodger was the youngest player ever elected to the Baseball Hall of Fame?",
    answers: {
      a: "Pee Wee Reese",
      b: "Sandy Koufax",
      c: "Duke Snider",
    },
    correctAnswer: "b",
  },
  {
    question:
      "What legendary broadcaster called Dodger games from 1950 through 2016?",
    answers: {
      a: "Vin Scully",
      b: "Charley Steiner",
      c: "Red Barber",
    },
    correctAnswer: "a",
  },
];
var state = {
  activeQuestion: null,
  activeQuestionAnswer: null,
  answeredCorrectly: 0,
  answeredIncorrectly: 0,
  totalQuestions: questions.length - 1,
  finalScore: 0,
};
var scoreboard = [
  {
    Name: "BH",
    Score: 51,
  },
  {
    Name: "KB",
    Score: 32,
  },
];

window.onload = function () {
  alert(
    "Press the play button to the left to listen to some music while you take your quiz!"
  );
};

//Function to start quiz:
function startQuiz() {
  state.activeQuestion = 0;
  state.activeQuestionAnswer = null;
  state.answeredCorrectly = 0;
  state.answeredIncorrectly = 0;
  updateQuestion(state.activeQuestion);
  document.getElementById("quiz").style.display = "block";
  document.getElementById("intro").className = "container hide";
  document.getElementById("results").className = "container hide";
  document.getElementById("otherScores").className = "container hide";
}

//Function that will start the quiz at the start/restart of the quiz:
function startTimer() {
  sec = 60;
  time = setInterval(myTimer, 1000);

  function myTimer() {
    document.getElementById("timer").innerHTML = sec + "sec left";
    sec--;
    if (sec <= 0) {
      clearInterval(time);
      alert("Time's up!");
      endOfQuiz();
    }
  }
}

//function that will stop the timer where it's at when the quiz finishes.
function timerStop() {
  clearInterval(time);
}

//Click event listeners:

document.getElementById("countdown").addEventListener("click", function () {
  startTimer();
  startQuiz();
});

document.getElementById("ans1").addEventListener("click", function () {
  checkAnswer("a");
});

document.getElementById("ans2").addEventListener("click", function () {
  checkAnswer("b");
});

document.getElementById("ans3").addEventListener("click", function () {
  checkAnswer("c");
});

document.getElementById("submit-score").addEventListener("click", function () {
  var finalScoreObj = {
    Name: document.getElementById("initials").value,
    Score: state.finalScore,
  };

  scoreboard.push(finalScoreObj);
  console.log(scoreboard);
  document.getElementById("inputResults").className = "container hide";
  document.getElementById("otherScores").className = "container";
  updateScoreTable();
});

document.getElementById("restart").addEventListener("click", function () {
  startTimer();
  startQuiz();
});

document.getElementById("scoreBtn").addEventListener("click", function () {
  endOfQuiz();
  document.getElementById("inputResults").className = "container hide";
  document.getElementById("otherScores").className = "container";
});

function checkAnswer(answer) {
  //check if the answer is correct or incorrect.
  //if answer is correct, advance to next question.
  //if answer is incorrect, decrement time and display message.
  if (state.activeQuestionAnswer === answer) {
    state.activeQuestion++;
    if (state.activeQuestion > state.totalQuestions) {
      endOfQuiz();
    }
    state.answeredCorrectly++;
    updateQuestion(state.activeQuestion);
  } else {
    sec = sec - 10;
    alert("Wrong!");
    state.activeQuestion++;
    if (state.activeQuestion > state.totalQuestions) {
      endOfQuiz();
    }
    state.answeredIncorrectly++;
    updateQuestion(state.activeQuestion);
  }
}

//Function to push the next question through:
function updateQuestion(questionIndex) {
  var currentQuestion = questions[questionIndex];
  document.getElementById("quizQuestion").innerHTML = currentQuestion.question;
  document.getElementById("ans1").innerHTML = currentQuestion.answers.a;
  document.getElementById("ans2").innerHTML = currentQuestion.answers.b;
  document.getElementById("ans3").innerHTML = currentQuestion.answers.c;
  state.activeQuestionAnswer = currentQuestion.correctAnswer;
}

//Function for when the quiz is done:
function endOfQuiz() {
  state.finalScore = sec;
  document.getElementById("quiz").style.display = "none";
  document.getElementById("results").className = "container";
  document.getElementById("inputResults").className = "container";
  document.getElementById("score").innerHTML = state.finalScore;
  timerStop();

  //capture the sec and store in a variable to stop the timer--to be able to display it as score
  //display the score--update span with score value
  //display input for initials---then take value of initials and finalScore push to scoreboard
  //clear state
  //display "restart" button to restart quiz
  //stop timer
}

//Function to update the high score list:
function updateScoreTable() {
  document.getElementById("otherScores").innerHTML = "";
  var tablearea = document.getElementById("otherScores"),
    table = document.createElement("table");

  scoreboard.forEach(function (highScore) {
    var tr = document.createElement("tr");

    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));

    tr.cells[0].appendChild(document.createTextNode(highScore.Name));
    tr.cells[1].appendChild(document.createTextNode(highScore.Score));

    table.appendChild(tr);
  });

  tablearea.appendChild(table);
}
