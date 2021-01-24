//Variables:
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var sec = 60;
var time;
var questions = [
  {
    question:
      "What song do Timon and Pumba teach Simba in the 'The Lion King?'",
    answers: {
      a: "Can You Feel The Love Tonight",
      b: "Hakuna Matata",
      c: "I Just Can't Wait To Be King",
    },
    correctAnswer: "b",
  },
  {
    question: "What group of animals raise Tarzan in the 'Tarzan' film?",
    answers: {
      a: "Wolves",
      b: "Pandas",
      c: "Gorillas",
    },
    correctAnswer: "c",
  },
  {
    question: "Who visits the workshop and brings Pinocchio to life?",
    answers: {
      a: "A blue fairy",
      b: "A pink fairy",
      c: "Eeyore",
    },
    correctAnswer: "a",
  },
  {
    question: "What is the name of Elsa’s younger sister in 'Frozen?'",
    answers: {
      a: "Princess Buttercup",
      b: "Princess Jasmine",
      c: "Princess Anna",
    },
    correctAnswer: "c",
  },
  {
    question: "What is the name of Wendy’s dog in Peter Pan?",
    answers: {
      a: "Bolto",
      b: "Nana",
      c: "Chip",
    },
    correctAnswer: "b",
  },
  {
    question: "What does Hakuna Matata mean?",
    answers: {
      a: "No Worries",
      b: "Hangloose",
      c: "See you later",
    },
    correctAnswer: "a",
  },
  {
    question: "How old is Crush in Finding Nemo?",
    answers: {
      a: "233",
      b: "43",
      c: "150 (and still young!)",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Emperor Kuzco turns into what animal in The Emperor’s New Groove?",
    answers: {
      a: "Zebra",
      b: "Cow",
      c: "Llama",
    },
    correctAnswer: "c",
  },
  {
    question: "All you need is a little faith, trust, and what else?",
    answers: {
      a: "A Jetpack",
      b: "Pixie Dust",
      c: "Sugar",
    },
    correctAnswer: "b",
  },
  {
    question:
      "What name does Mulan pick for herself while pretending to be a man?",
    answers: {
      a: "Ping",
      b: "Ling",
      c: "Chew",
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
