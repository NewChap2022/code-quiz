var clearBtn = document.querySelector("#reset");

var loadScore = function() {
    var savedScore = localStorage.getItem("savedScore");
    if (!savedScore) {
        return false;
    };

    savedScore = JSON.parse(savedScore);
    savedScore = savedScore.sort(function(a, b) {return b.score - a.score});

    // reference from https://stackoverflow.com/questions/70298582/how-to-make-a-leaderboard-ranking-scores-javascript
    for(var i = 0; i < savedScore.length; i++){
        tableContent = "<tr><td>" + (i + 1) + "</td><td>" + savedScore[i].name + "</td><td>" + savedScore[i].score + "</td></tr>";
        document.querySelector("#highscore-table").innerHTML += tableContent;
      };
}

loadScore();

clearBtn.onclick = function () {
    localStorage.removeItem("savedScore");
    location.reload();
};

