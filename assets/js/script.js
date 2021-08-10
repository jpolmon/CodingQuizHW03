// Buttons
let startQuiz = document.querySelector('.start-button');
let hscoresBtn = document.querySelector('.highscores-button');
let button1 = document.querySelector('.button1');
let button2 = document.querySelector('.button2');
let button3 = document.querySelector('.button3');
let button4 = document.querySelector('.button4');
let reset = document.querySelector('.clear-scores');
let goBack = document.querySelector('.go-back');

// Text input
let inputInitials = document.querySelector('.input-initials');

// HTML sections
let mainPage = document.querySelector('main');
let header = document.querySelector('header');
let quizPage = document.querySelector('.quiz');
let endPage = document.querySelector('.all-done');
let displayScore = document.querySelector('.display-score');
let hscoresPage = document.querySelector('.highscores');
let timeEl = document.querySelector('.time-left');
let initials = document.querySelector('#initials');
let question = document.querySelector('.question');
let correct = document.querySelector('.correct');
let wrong = document.querySelector('.wrong');
let scores = document.querySelector('.scores');

// Array of questions
let questionOptions = [
    {question: "Which of the following is not a primitive data type in JavaScript?", 
    answers: ["number", "string", "double", "boolean"], 
    key: "2"},
    
    {question: "What is the syntax for joining arrays in JavaScript?", 
    answers: [".push()", ".concat()", ".pop()", ".splice()"], 
    key: "1"},
    
    {question: "The ______ is a powerful component of the browser dev tools that can help locate/troubleshoot JavaScript issues.", 
    answers: ["Elements", "Application", "Network", "Console"], 
    key: "3"},
   
    {question: "Local storage can only store information in this data type.", 
    answers: ["string", "number", "bigint", "boolean"], 
    key: "0"},
    
    {question: "If you can access properties of a variable called thing with thing.property, then it is a(n) ______", 
    answers: ["method", "object", "double", "boolean"], 
    key: "1"},
    
    {question: "What is the function for determining the location of an element in an array?", 
    answers: [".splice()", ".length()", ".contains()", ".indexOf()"], 
    key: "3"},
    
    {question: "What would you include in your JavaScript file to utilize an HTML button?", 
    answers: ["Event Listener", "Method", "Array", "Number"], 
    key: "0"},
    
    {question: "What display type would you use if you want items to be dynamically sized?", 
    answers: ["block", "inline", "flex", "inline-block"], 
    key: "2"},
    
    {question: "Which of the following is a true conditional statement?", 
    answers: ["50 = 50", "50 === 50", "50 !== 50", "50 === \"50\""], 
    key: "1"},
    
    {question: "______ is normally used to remove the default styling applied by a web browser.", 
    answers: ["script.js", "style.css", "index.html", "reset.css"], 
    key: "3"}
    ]

// Empty arrays to be used later
let hsNames = [];
let hsScores = [];

// Global variables
let timeLeft = 90;
let currentQuestion = 0;
let questionsLeft = questionOptions.length-1;

// Init that runs on page load to get scores from local storage in case they go the the highscores page before playing the game
init();

function init(){

    let storedNames = JSON.parse(localStorage.getItem("names"));
    let storedScores = JSON.parse(localStorage.getItem("scores"));

    if(storedNames !== null) {

        hsNames = storedNames;
    }

    if (storedScores !== null) {

        hsScores = storedScores;
    }

    renderScores();
}

// Function to start displaying the questions and starts the countdown
function quiz() {

    header.setAttribute("style", "justify-content: flex-end;");
    hscoresBtn.setAttribute("style", "display: none");
    mainPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: flex");
    correct.setAttribute("style", "display: none");
    wrong.setAttribute("style", "display: none");
    
    cycleQuestions();
    countdown();
}

// Function for the countdown timer
function countdown() {
   
    let timeInterval = setInterval(function () {

        if (questionsLeft < 0) {

            timeEl.textContent = "Time Remaining: " + timeLeft + " seconds";
            displayScore.textContent = "Your final score is " + timeLeft + "!"

            quizPage.setAttribute("style", "display: none");
            endPage.setAttribute("style", "display: flex");
            header.setAttribute("style", "justify-content: space-between;");
            hscoresBtn.setAttribute("style", "display: inline");

            clearInterval(timeInterval);
        }  
        
        if (timeLeft > 1) {

            timeEl.textContent = "Time Remaining: " + timeLeft + " seconds";            
            timeLeft--;            
        }
        else if (timeLeft === 1) {
            
            timeEl.textContent = "Time Remaining: " + timeLeft + " second";
            timeLeft--;            
        }
        else {

            timeEl.textContent = "Time Remaining: " + timeLeft + " seconds";
            displayScore.textContent = "Your final score is " + timeLeft + "!"

            quizPage.setAttribute("style", "display: none");
            endPage.setAttribute("style", "display: flex");
            header.setAttribute("style", "justify-content: space-between;");
            hscoresBtn.setAttribute("style", "display: inline");

            clearInterval(timeInterval);
        }                            
    }, 1000);
}

// Funciton that changes the text for the questions and the answer boxes
function cycleQuestions() {
    
    if (questionsLeft < 0) {

        return;
    }
    else {

        question.textContent = questionOptions[currentQuestion].question;

        let currentAnswers = questionOptions[currentQuestion].answers;
        button1.textContent = currentAnswers[0];
        button2.textContent = currentAnswers[1];
        button3.textContent = currentAnswers[2];
        button4.textContent = currentAnswers[3];  
    }
}

// Function that checks the chosen answer against the answer key
function checkQuestion(selectedAnswer) {

    const key = questionOptions[currentQuestion].key

    if(selectedAnswer == key) {

        correct.setAttribute("style", "display: block");
        wrong.setAttribute("style", "display: none");
    }
    else {

        wrong.setAttribute("style", "display: block");
        correct.setAttribute("style", "display: none");

        timeLeft -= 10;
    }
}

// Function that clears and re-displays the scores 
function renderScores() {

    scores.innerHTML = "";

    for (let i = 0; i < hsNames.length; i++) {

        let hsName = hsNames[i];
        let hsScore = hsScores[i];

        let li = document.createElement("li");
        li.textContent = hsScore + " - " + hsName;

        scores.appendChild(li);        
    }
}

// Start button event
startQuiz.addEventListener("click", function() {

    quiz();
})

// 4 answer buttons
button1.addEventListener("click", function(event) {

    checkQuestion(0);
    currentQuestion++;
    questionsLeft--;
    cycleQuestions();
}) 

button2.addEventListener("click", function(event) {

    checkQuestion(1);
    currentQuestion++;
    questionsLeft--;
    cycleQuestions();
}) 

button3.addEventListener("click", function(event) {

    checkQuestion(2);
    currentQuestion++;
    questionsLeft--;
    cycleQuestions();
}) 

button4.addEventListener("click", function(event) {

    checkQuestion(3);
    currentQuestion++;
    questionsLeft--;
    cycleQuestions();
}) 

// Submit button for initals, it applies the new score to the scoreboard before going to it
inputInitials.addEventListener("click", function() {

    let currentName = document.querySelector("#initials").value;
    let currentScore = timeLeft;
    
    hsNames.push(currentName);
    hsScores.push(currentScore);
    
    localStorage.setItem("names", JSON.stringify(hsNames));
    localStorage.setItem("scores", JSON.stringify(hsScores));
    
    renderScores();

    mainPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    endPage.setAttribute("style", "display: none");
    hscoresPage.setAttribute("style", "display: flex");
})

// Highscores button
hscoresBtn.addEventListener("click", function() {

    mainPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    endPage.setAttribute("style", "display: none");
    hscoresPage.setAttribute("style", "display: flex");
})

// Button to reset the highscores, also clears the local stored scores in case the page isn't refreshed
reset.addEventListener("click", function() {

    localStorage.clear();
    scores.innerHTML = "";
    hsNames = [];
    hsScores = [];
})

// Button to take you back to the start, resets necessary variables
goBack.addEventListener("click", function(){

    mainPage.setAttribute("style", "display: flex");
    quizPage.setAttribute("style", "display: none");
    endPage.setAttribute("style", "display: none");
    hscoresPage.setAttribute("style", "display: none");

    timeLeft = 90;
    currentQuestion = 0;
    questionsLeft = questionOptions.length-1;
    timeEl.textContent = "Time Remaining: " + timeLeft + " seconds";
})





