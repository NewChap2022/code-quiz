var startBtn = document.querySelector("#start-btn");
var intro = document.querySelector("#intro");
var main = document.querySelector("main");
var questionIndexCount = 0;
var savedScore = localStorage.getItem("savedScore");
var time = 60;

var quizContent = [
    {
        question: "lorem jeleljt dielf fjlejti fjoelet jfieo jeoe fiejfj fjiefj fjielfj fjieljf eilmc jioejf jioejf fjei",
        options: ["jieoegoep", "jioetpmf", "jeiwpjpw", "jeipemtg"],
        answer: 0
    },

    {
        question: "jfiepetjn jflseji  fggkgk ffkfklr fkkf fjfr fkfle fkkflle fkelf",
        options: ["jfjfj", "jfjj", "jjj", "mcmcm"],
        answer: 2
    },
];

var quizCreate = function () {
    var quiz = document.createElement("div");
    quiz.id = "quiz";
    main.appendChild(quiz);

    var questionContainer = document.createElement("div");
    questionContainer.className = "question-container";
    questionContainer.id = "question";
    questionContainer.innerHTML = quizContent[questionIndexCount].question;
    quiz.appendChild(questionContainer);

    var optionContainer = document.createElement("div");
    optionContainer.className = "option-container";
    quiz.appendChild(optionContainer);

    for (var i = 0; i < 4; i++) {
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.className = "option";
        btn.id = "opt-" + (i + 1) + "";
        optionContainer.appendChild(btn);
        btn.innerText = quizContent[questionIndexCount].options[i];
    }

    var resultContainer = document.createElement("div");
    resultContainer.id = "result";
    resultContainer.innerHTML = "Do you know the answer?";
    quiz.appendChild(resultContainer);
}

var answerQuiz = function (event) {
    var selectAnswer = event.target;
    if (selectAnswer.matches(".option")) {
        var indexAnswer = quizContent[questionIndexCount].answer;
        var answerContent = quizContent[questionIndexCount].options[indexAnswer];
        var chosenOption = selectAnswer.innerHTML;
        var result = document.querySelector("#result");
        if (chosenOption === answerContent) {
            result.innerHTML = "Correct Answer";
        } else {
            result.innerHTML = "Wrong Answer";
            time = time - 10;
        };

        setTimeout(makeQuestion, 2000);
    }
};

var makeQuestion = function () {
    console.log("Next Question is Coming!");
    document.activeElement.blur();
    var result = document.querySelector("#result");
    result.innerHTML = "Do you know the answer?"
    questionIndexCount++;
    if (questionIndexCount <= quizContent.length - 1) {
        var questionContainer = document.querySelector("#question");
        questionContainer.innerHTML = quizContent[questionIndexCount].question;
        for (var i = 0; i < 4; i++) {
            var btn = document.querySelector("#opt-" + (i + 1) + "");
            btn.innerText = quizContent[questionIndexCount].options[i];
        };
    } else {
        var quiz = document.querySelector("#quiz");
        quiz.style.display = "none";
        alert("Congratulations! You have answered all the questions and let's check out how you do. Your score is " + time)
        saveScore(time);
    }
}

var saveScore = function (score) {
    var name = prompt("What's your name?");
    var playerScore = { name: name, score: score };
    if (!savedScore) {
        savedScore = [];
    } else {
        savedScore = JSON.parse(savedScore)
    };
    savedScore.push(playerScore);
    localStorage.setItem("savedScore", JSON.stringify(savedScore));
    window.open("highscore.html", "_self")
}

var countDown = function () {
    var countDownTimer = document.querySelector("#countdown");
    countDownTimer.style.display = "block";
    var timeLeft = setInterval(function () {
        if (time <= 0) {
            clearInterval(timeLeft);
            countDownTimer.innerText = "Time's Up!"
            var quiz = document.querySelector("#quiz");
            quiz.style.display = "none";
            alert ("Sorry, time's up!  Your score is" + time);
            window.open("highscore.html", "_self");
        } else {
            countDownTimer.innerText = "Time Left: " + time;
        };
        time --;
    }, 1000)
}

startBtn.onclick = function () {
    intro.style.display = "none";
    quizCreate();
    time = 200;
    countDown();
};

main.addEventListener("click", answerQuiz);