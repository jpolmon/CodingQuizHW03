let startQuiz = document.querySelector('.start-button');
let highscores = document.querySelector('.highscores-button');
let mainPage = document.querySelector('main');
let quizPage = document.querySelector('.quiz');
let endPage = document.querySelector('.all-done');
let timeEl = document.querySelector('.time-left');

function quiz() {
    mainPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: flex");
    countdown();
}

function countdown() {
   
    let timeLeft = 10;

    let timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timeLeft--;
            timeEl.textContent = "Time Remaining: " + JSON.stringify(timeLeft) + " seconds";
        }
        else if (timeLeft === 1) {
            timeLeft--;
            timeEl.textContent = "Time Remaining: " + JSON.stringify(timeLeft) + " second";
        }
        else {
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


