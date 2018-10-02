'use strict'
//STATE object to store/manipulate question data
const STATE = [
    {questiontitle: 'Who created Bitcoin?',
     choices: ["Satoshi Nakamoto","other guy","no", "c'mon it's 2018, you should know this"
        ],
      correctAnswer: "Satoshi Nakamoto",
      icon: 'https://i.imgur.com/gQvT9fW.png',
      alt: 'bitcoin brain'
    },
    {
      questiontitle: "What is blockchain?",
     choices: [
        "A continuously updated record of who holds what. These records are split into link blocks and are secured using cryptography","Erik B. and Rakim’s 5th album","A penitentiary in Louisiana","A fortnight dance"
        ],
        correctAnswer: "A continuously updated record of who holds what. These records are split into link blocks and are secured using cryptography",
        icon: 'https://i.imgur.com/rXWV7Zk.png',
        alt: 'blockchain cycle icon'
    },
    {
      questiontitle:"What is the double spending problem?",
      choices: [
        "A potential flaw where the same digital token can be spent more than once","When you took out two payday loans before Friday","When you get a reversal on your smart contract","When your sugar daddy has two baby-mommas"
        ],
        correctAnswer:  "A potential flaw where the same digital token can be spent more than once",
        icon: 'https://i.imgur.com/eUubxQi.png',
        alt: 'piggy bank icon'
    },
    {
      questiontitle: "What is Steem it?",
      choices: [
        "'Choo-Choooo'","A reddit competitor that pays users in cryptocurrency, creating an attention-based economy","A way to cook edamame","A game that rewards it's users in bitcoin"
        ],
      correctAnswer:  "A reddit competitor that pays users in cryptocurrency, creating an attention-based economy",
      icon: 'https://i.imgur.com/QpWVutR.png',
      alt: 'chat bubble icon'
    },
    {
      questiontitle:  "What is automated trust",
      choices: ["Trust that is only shared with a certain group of high ranking officers", "Trust that is inherently built into the system. because the system is available for everyone to see the ledger transactions in real time", "A automated message system from central banks" ,"A gut feeling"
        ],
      correctAnswer: "Trust that is inherently built into the system. because the system is available for everyone to see the ledger transactions in real time",
      icon: 'https://i.imgur.com/9397I31.png',
      alt: 'eye icon'
    },
    {
      questiontitle: "What was the highest bitcoin price ever, in USD?",
      choices: ["32,000", "20,000", "17,000", "9,000"
        ],
      correctAnswer: "20,000",
      icon: 'https://i.imgur.com/FGw9LRz.png',
      alt: 'bitcoin USD icon'
    },
    {
      questiontitle: "What is a node?",
      choices: [
      "Type of smart contract", "A parent block", "A computer on a blockchain network", "A wallet"
      ],
      correctAnswer: "A computer on a blockchain network",
      icon: 'https://i.imgur.com/vd74XkT.png',
      alt: 'home icon'
    },
    {
     questiontitle: "Which is NOT a part of asymmetric encryption?",
      choices: [
       "Mining", "Public key", "Passphrase", "Private key"
      ],
      correctAnswer: "Mining",
      icon: 'https://i.imgur.com/sF5AuP2.png',
      alt: 'lock icon'
    },
    {
      questiontitle: "What is the term for when a blockchain splits?",
      choices: [
      "Dork", "Knife", "Spoon", "Fork"
      ],
      correctAnswer: "Fork",
      icon: 'https://i.imgur.com/pMkmEAR.png',
      alt: 'two coin stacks icon'
    },
    {
     questiontitle: "What is cold storage?",
      choices: [
        "A place to hang your coat", "A private key connected to the internet", "A drawer in your fridge", "A desktop wallet"
    ],
    correctAnswer: "A private key connected to the internet",
    icon: 'https://i.imgur.com/SRhCAac.png',
    alt: 'coin and cloud icon'
    }
];
//quiz form to be rendered in html
function renderQuestions () {
  if (currentQuestionIndex < STATE.length) {
    return `<section class="question-${currentQuestionIndex}">
    <h2>${STATE[currentQuestionIndex].questiontitle}</h2>
    <form>
    <legend>Select the correct answer and then select submit to move on to the next question!</legend>
    <fieldset>
    <label class="answerChoice">
    <input type="radio" value="${STATE[currentQuestionIndex].choices[0]}" name="answer" required>
    <span>${STATE[currentQuestionIndex].choices[0]}</span>
    </label>
    <label class="answerChoice">
    <input type="radio" value="${STATE[currentQuestionIndex].choices[1]}" name="answer" required>
    <span>${STATE[currentQuestionIndex].choices[1]}</span>
    </label>
    <label class="answerChoice">
    <input type="radio" value="${STATE[currentQuestionIndex].choices[2]}" name="answer" required>
    <span>${STATE[currentQuestionIndex].choices[2]}</span>
    </label>
    <label class="answerChoice">
    <input type="radio" value="${STATE[currentQuestionIndex].choices[3]}" name="answer" required>
    <span>${STATE[currentQuestionIndex].choices[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </section>`;

} else {
    renderResults();
    restartQuiz();
    $('.currentQuestionIndex').text(10)
  }
}

let currentQuestionIndex = 0;
let score = 0;



//start quiz, on click hide start section, show quiz form 
function startQuiz () {
  $('#start').on('click', '.startButton', function (event) {
    $('#start').hide();
    $(".quizForm").show();
    $('.currentQuestionIndex').text(1);
  
});
}
//increase question number
function increaseQuestionNumber () {
    currentQuestionIndex++;
  $('.currentQuestionIndex').text(currentQuestionIndex+1);
}

//increase score
function changeScore () {
  score++;
}
// render questions in the DOM
function renderQuestion () {
  $('.quizForm').html(renderQuestions());
}

//user selects answer on submit run user feedback
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();

//Get checked answer value and create classes for 'right' and 'wrong'
    let checkedAnswer = $('input:checked');
    let answer = checkedAnswer .val();
    let correctAnswer = `${STATE[currentQuestionIndex].correctAnswer}`;
    if (answer === correctAnswer) {
      checkedAnswer.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      checkedAnswer.parent().addClass('wrong');
      wrongAnswer();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function wrongAnswer () {
  userAnswerFeedbackWrong();
}

//user feedback box for correct answer
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STATE[currentQuestionIndex].correctAnswer}`;
  $('.quizForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STATE[currentQuestionIndex].icon}" alt="${STATE[currentQuestionIndex].alt}"/></div><p><b>BAZINGA!</b></p><button type=button class="nextButton">Next</button></div>`);
}

//user feedback box for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STATE[currentQuestionIndex].correctAnswer}`;
  
  $('.quizForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STATE[currentQuestionIndex].icon}" alt="${STATE[currentQuestionIndex].alt}"/></div><p><b>Incorrect</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

//update score text
function updateScore () {
  changeScore();
  $('.score').text(score);
}

//result feedback with option to restart
function renderResults () {
  if (score >= 8) {
    $('.quizForm').html(`<div class="results correctFeedback"><h3>Jackpot!</h3><img src="https://i.imgur.com/lYEiOIb.png" alt="hand with crypto icon"/><p>You got ${score} / 10</p><p>You're ready to dive into the world of cryptos and blockchain!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5 ) {
    $('.quizForm').html(`<div class="results correctFeedback"><h3>Almost there!</h3><img src="https://i.imgur.com/N8p3VBJ.png" alt="mining icon"/><p>You got ${score} / 10</p><p>Mine for more knowledge on blockchain and you'll be a cryto-bro faster than a bitcoin price drop! </p><button class="restartButton">Restart Quiz</button></div>`);
  } else $('.quizForm').html(`<div class="results correctFeedback"><h3>Yikes! You may want to stick with fiat currency and central banking</h3><img src="https://i.imgur.com/oZOzcoZ.png" alt="coin"/><p>You got ${score} / 10</p><p>Go back and read the article and you'll be a blockchain pro in no time!</p><button class="restartButton">Restart Quiz</button></div>`);
  };
  
//next question function
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    increaseQuestionNumber()
    renderQuestion();
    userSelectAnswer();
  });
}

//restart quiz function by reloading page
function restartQuiz () {
 $(".restartButton").click(function() {
restartQuiz(location.reload(true), t);
});
}

//run quiz functions
function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
