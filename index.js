let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(".btn").on("click", function() {
        let userChosenColour = $(this).attr("id");

        userClickedPattern.push(userChosenColour);
        //console.log(userClickedPattern);

        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });

$(document).on("keydown", function(event) {
    if(event.key == "a" || event.key == "A") {
        startOver();
        $("h1").text("Level " + level);
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    let audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();

    $("h1").text("Level " + level);
    level++;

    console.log(gamePattern);
};

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        $("h1").text("Game Over, Press A To Restart");

        console.log("Wrong");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    $("body").removeClass("game-over");
}