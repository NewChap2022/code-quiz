var startBtn = document.querySelector("#start-btn");
var intro = document.querySelector("#intro");
var main = document.querySelector("main");
var quizContent = [
    {
        question: "lorem jeleljt dielf fjlejti fjoelet jfieo jeoe fiejfj fjiefj fjielfj fjieljf eilmc jioejf jioejf fjei",
        options: ["jieoegoep", "jioetpmf", "jeiwpjpw", "jeipemtg"],
        answer: 0
    },
];

var quizCreate = function () {
    var quiz = document.createElement("div");
    quiz.id = "quiz";
    main.appendChild(quiz);

    var questionContainer = document.createElement("div");
    questionContainer.className = "question-container";
    questionContainer.id = "question";
    questionContainer.innerHTML = quizContent[0].question;
    quiz.appendChild(questionContainer);

    var optionContainer = document.createElement("div");
    optionContainer.className = "option-container";
    quiz.appendChild(optionContainer);

    for (var i = 0; i < 4; i++) {
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.className = "option";
        btn.id = "opt-" + i+1 + "";
        optionContainer.appendChild(btn);
        btn.innerText = quizContent[0].options[i];
    }

    var resultContainer = document.createElement("div");
    resultContainer.id = "result";
    resultContainer.innerHTML = "Do you know the answer?";
    quiz.appendChild(resultContainer);
}

startBtn.onclick = function () {
    intro.style.display = "none";
    quizCreate()
};