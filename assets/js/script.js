let startQuiz = document.querySelector('.start-button');
let highscores = document.querySelector('.highscores-button');
let inputInitials = document.querySelector('.input-initials');
let mainPage = document.querySelector('main');
let quizPage = document.querySelector('.quiz');
let endPage = document.querySelector('.all-done');
let timeEl = document.querySelector('.time-left');
let initials = document.querySelector('#initials');

let hsNames = [];
let hsScores = [];

init();
function init(){
    hsNames = JSON.parse(localStorage.getItem("names"));
    hsScores = JSON.parse(localStorage.getItem("scores"));
}

function quiz() {
    mainPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: flex");
    countdown();
}

function countdown() {
   
    let timeLeft = 3;

    let timeInterval = setInterval(function () {
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
            localStorage.setItem("current-score", timeLeft);
            quizPage.setAttribute("style", "display: none");
            endPage.setAttribute("style", "display: flex");
            clearInterval(timeInterval);
        }
        
        // if (wordArray.includes("_") == false) {
        //     displayWord.textContent = "YOU WIN! :)";
        //     playerWins++;
        //     localStorage.setItem("wins", JSON.stringify(playerWins));
        //     wins.textContent = localStorage.getItem("wins");
        //     clearInterval(timeInterval);
        // }              
    }, 1000);
}

startQuiz.addEventListener("click", function() {
    quiz();
})

inputInitials.addEventListener("click", function() {
    let currentName = document.querySelector("#initials").value;
    let currentScore = localStorage.getItem("current-score"); 
    console.log(currentName);
    console.log(currentScore);   
    hsNames.push(currentName);
    hsScores.push(currentScore);
    console.log(hsNames);
    console.log(hsScores);
    localStorage.setItem("names", JSON.stringify(hsNames));
    localStorage.setItem("scores", JSON.stringify(hsScores));
    console.log(localStorage);
})




