var startBtnEl = document.querySelector("#start-btn");
var introEl = document.querySelector("#intro");
var mainEl = document.querySelector("main");
var countDownTimerEl = document.querySelector("#countdown");
var questionIndexCount = 0;
var savedScore = localStorage.getItem("savedScore");
var time = 200;

// all the questions in the quiz
var quizContent = [
    {
        question: "What is one advantage of Responsive Design for a developer?",
        options: ["Faster page loading time", "Faster development", "More social sharing", "Improved SEO"],
        answer: 1
    },

    {
        question: "When using flexbox, which property needs to be adjusted in order to add space between items?",
        options: ["justify-content", "flex-flow", "align-content", "space-between"],
        answer: 0
    },

    {
        question: "How would you create a box with rounded corners using CSS?",
        options: ["box-corner: round", "corner-style: round", "border-radius: 50px", "transform: round(corner)"],
        answer: 2
    },

    {
        question: "What is a CSS reset?",
        options: ["Deleting the contenst of a stylesheet to implement entirely new design", "A stylesheet that clears the default formatting of the browser", "A CSS property that resets the values of child elements", "A media query that resets the responsive design when switching devices"],
        answer: 1
    },

    {
        question: "A client wants to make sure that the browser has multiple fonts to choose from, just in case the default font isn't supported. How would you make sure that the default font is set to 'Arial', but that there are also two other fonts available to the browser?",
        options: ["Add a stylesheet for each additional font", "Assign 'Arial' to the default-font property and use the alternative-font property for the backups", "None of the above. The default font of all browsers is 'Arial' and you can only specify one alternative.", "Assign multiple fonts to the font-family property"],
        answer: 3
    },

    {
        question: " Which user-action pseudo-class would you need to add in order to change an element when the mouse is over it?",
        options: [":visited", ":activate", ":checked", ":hover"],
        answer: 3
    },

    {
        question: "What is wireframing?",
        options: ["A blueprint of our website's page layout.", "A 3D model of our websites structure made from wires.", "A CSS library that helps in the creation of borders around our boxed elements.", "Wireframing helps us quickly set up our HTML page."],
        answer: 0
    },

    {
        question: "How do you declare a custom property or 'CSS variable'?",
        options: ["var root-my-color = green;", ":root { var my-color = green; }", "var my-color = green;", ":root { --my-color: green; }"],
        answer: 3
    },

    {
        question: "How would I check which files are staged, unstaged, and untracked using git commands?",
        options: ["git commit -m", "git status", "git fetch", "git add ."],
        answer: 1
    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<script>", "<javascript>", "<link>"],
        answer: 1
    }
];

// create html element to display quiz
var quizCreate = function () {
    var quiz = document.createElement("div");
    quiz.id = "quiz";
    mainEl.appendChild(quiz);

    var questionContainer = document.createElement("div");
    questionContainer.className = "question-container";
    questionContainer.id = "question";
    questionContainer.innerHTML = quizContent[questionIndexCount].question;
    quiz.appendChild(questionContainer);

    var optionContainer = document.createElement("div");
    optionContainer.className = "option-container";
    quiz.appendChild(optionContainer);

    // using for loops to add text content to buttons
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

// give feedback after choosing answers
var answerQuiz = function (event) {
    var selectAnswer = event.target;
    // check if the selected answer matches the right answer
    if (selectAnswer.matches(".option")) {
        var indexAnswer = quizContent[questionIndexCount].answer;
        var answerContent = quizContent[questionIndexCount].options[indexAnswer];
        var chosenOption = selectAnswer.innerText;
        var result = document.querySelector("#result");

        if (chosenOption === answerContent) {
            result.innerHTML = "Correct Answer";
            result.style.color = "green"
        } else {
            result.innerHTML = "Wrong Answer";
            result.style.color = "red"
            time = time - 20;
        };
        // offer time to see the feedback before automatically jump to next question
        setTimeout(makeQuestion, 1500);
    }
};

// refresh new question
var makeQuestion = function () {
    console.log("Next Question is Coming!");
    document.activeElement.blur();
    var result = document.querySelector("#result");
    result.innerHTML = "Do you know the answer?";
    result.style.color = "black";
    questionIndexCount++;
    if (questionIndexCount <= quizContent.length - 1) {
        var questionContainer = document.querySelector("#question");
        questionContainer.innerHTML = quizContent[questionIndexCount].question;
        for (var i = 0; i < 4; i++) {
            var btn = document.querySelector("#opt-" + (i + 1) + "");
            btn.innerText = quizContent[questionIndexCount].options[i];
        };
    } else {
        // to avoid finish last question while time's up
        if (time > 0) {
            var quiz = document.querySelector("#quiz");
            quiz.style.display = "none";
            countDownTimerEl.style.display = "none";
            var end = document.createElement("div");
            end.id = "end";
            mainEl.appendChild(end);
            end.innerHTML = "<h2>Congratulations!</h2><p>You have answered all the questions and let's check out how you do.</p><p>Your score: <span>" + time + "</span></p>";
            saveScore(time, end);
        }
    }
}

// save the score into local storage
var saveScore = function (score, container) {
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Your Initial Please");
    container.appendChild(nameInput);
    var submitBtn = document.createElement("button");
    submitBtn.innerText = "Submit";
    container.appendChild(submitBtn);
    submitBtn.onclick = function () {
        var playerName = nameInput.value;
        var playerScore = { name: playerName, score: score };
        if (!savedScore) {
            savedScore = [];
        } else {
            savedScore = JSON.parse(savedScore)
        };
        savedScore.push(playerScore);
        localStorage.setItem("savedScore", JSON.stringify(savedScore));
        window.open("highscore.html", "_self")
    }
}

// countdown time
var countDown = function () {
    countDownTimerEl.style.display = "block";
    var timeLeft = setInterval(function () {
        if (time <= 0) {
            clearInterval(timeLeft);
            time = 0;
            countDownTimerEl.innerText = "Time's Up!"
            var quiz = document.querySelector("#quiz");
            quiz.style.display = "none";
            var end = document.createElement("div");
            end.id = "end";
            mainEl.appendChild(end);
            end.innerHTML = "<h2>Sorry!</h2><p>Time's up</p><p>Your score: <span>" + time + "</span></p>";
            saveScore(time, end);
        } else if (questionIndexCount === quizContent.length) {
            // when complete the quiz, to avoid time continue counting down while saving score
            clearInterval(timeLeft);
        } else {
            countDownTimerEl.innerText = "Time Left: " + time;
        };
        time--;
    }, 1000)
}

// after click start button, run all these functions
startBtnEl.onclick = function () {
    introEl.style.display = "none";
    quizCreate();
    time = 200;
    countDown();
};

mainEl.addEventListener("click", answerQuiz);