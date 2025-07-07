var gamePattern = [];
var userClickedPattern = [];
var buttonColors  = ["red" , "blue" , "green" , "yellow"];
var randomNumber; 
var userChosenColor ;

var started = false;

var level = 0 ;

$(document).keypress(function(){
    if(!started){
        $('#level-title').text("Level " + level);
        nextSequence();
        started = true;
    }
})



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            } , 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 200);
        $("#level-title").text("Game Over , Press Any Key to restart");
        startOver();
    }
    
}

$(".btn").click(function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name){
    var y = "sounds/" + name + ".mp3";
    let mySound = new Audio(y);
    mySound.play(); 
}

function animatePress(currentColor){
    var s = "#" + currentColor; 
    $(s).fadeOut(500).fadeIn(500);
}

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level" + level);
    var n = Math.random();
    n = n * 4; 
    n = Math.floor(n);
    randomNumber = n;
    
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}
function startOver(){
    gamePattern = [];
    started = false;
    level = 0 ;
}