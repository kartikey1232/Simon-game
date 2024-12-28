// $(document).keydown(function(event){
//     if(event.key === "a"){
//         initial_condn(); 
//     }
// })

// function select(){
//     return Math.ceil(Math.random()*4);
// }
// function select_box(num){
//     $("."+num).animate({opacity: 0.1},"fast");
//     make_sound(num);
//     $("."+num).animate({opacity: 1},"fast");
// }
// function wrong_choice(){
//     make_wrong_sound();
// }
// function make_wrong_sound(){
//     var audio=new Audio("./sounds/wrong.mp3");
//                 audio.play();
// }
// function make_sound(num){
//     switch(num){
//         case 2: var audio=new Audio("./sounds/red.mp3")
//                     audio.play();
//                     break;
//         case 4: var audio=new Audio("./sounds/blue.mp3")
//                     audio.play();
//                     break;
//         case 3: var audio=new Audio("./sounds/yellow.mp3")
//                     audio.play();
//                     break;
//         case 1: var audio=new Audio("./sounds/green.mp3")
//                     audio.play();
//                     break;
//         default:break;
//     }
// }
// function initial_condn(){
//     let game_sequence=[];
//     var level=1;
//     start_game(game_sequence,level);
// }
// function check_click(game){
//     var i=0;
//     $(".btn").on("click",function(){
//         if($(this).hasClass(game[i])){
//             i++;
//             if(i<game.length){
//                 check_click(game);
//             }
//             else{
//                 return 0;
//             }
//         }
//         else{
//             return -1;
//         }
//     })
    
// }
// function start_game(gseq,level){
//         $("#level-title").text("Level "+ level);
//         random=select();
//         select_box(random);
//         gseq.push(random);
//         var result=check_click(game);
//         if(result === -1){
//             wrong_choice();
//             $("#level-title").text("Game over, Press any key to restart");
//             arr=[]
//             $(document).keydown(function(){start_game(arr,1)});
//         }
//         else{
//             setTimeout(function(){
//                 start_game(gseq,useq,level+1);
//             },1000);
//         }
//         // $(".btn").off("click").on("click",function(){
//         //     if($(this).hasClass(random)){
//         //         select_box(random);

//         //         setTimeout(function(){
//         //             start_game(arr,level+1);
//         //         },1000);
//         //     }
             
//         //     else{
//         //         wrong_choice();
//         //         $("#level-title").text("Game over, Press any key to restart");
//         //         arr=[]
//         //         $(document).keydown(function(){start_game(arr,1)});
//         //     }
//         // })
// }
var started=false;
var wrong =false;
$(document).keydown(function(event){
    if(!started){
    if(event.key==="a"){
        nextSequence();
        started=true;
    }
}
})
var level=0;
var gamepattern=[];
var userClcikedPattern=[];
var buttonColor=["red","blue","green","yellow"];

function startOver(){
    level=0;
    wrong=false;
    gamepattern=[];
    userClcikedPattern=[];
    nextSequence();
}



function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColor[randomNumber];
    gamepattern.push(randomChosenColour);
    animation(gamepattern[level-1]);
}

function animation(box){
    $("#"+box).animate({opacity: 0.1},"fast");
    make_sound(box);
    $("#"+box).animate({opacity: 1},"fast");
}
function make_sound(box_id){
        switch(box_id){
            case "red": var audio=new Audio("./sounds/red.mp3")
                        audio.play();
                        break;
            case "blue": var audio=new Audio("./sounds/blue.mp3")
                        audio.play();
                        break;
            case "yellow": var audio=new Audio("./sounds/yellow.mp3")
                        audio.play();
                        break;
            case "green": var audio=new Audio("./sounds/green.mp3")
                        audio.play();
                        break;
            default:break;
        }
    }

    $(".btn").on("click",function(){
        userChosenColor=$(this).attr("id");
        userClcikedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClcikedPattern.length-1);
        make_sound(userChosenColor);
    })
    function animatePress(name) {
        $("#" + name).addClass("pressed");
        setTimeout(() => {
            $("#" + name).removeClass("pressed");
        }, 100); //delay function wont work here cause it only works with the animation methods and adding and removing classes is not a animation.
    }
    function checkAnswer(currentLevel){
        var user=userClcikedPattern[currentLevel];
        var game=gamepattern[currentLevel];
        if(user === game){
            if(userClcikedPattern.length === gamepattern.length){
                setTimeout(function(){
                    userClcikedPattern=[];
                    nextSequence();
                },1000)
            }
            else{
                return;
            }
        }
        else{
            $("body").addClass("red");
            setTimeout(function(){
                $("body").removeClass("red");
            },200)
            wrong_sound();
            wrong=true;
            $("h1").text("Game Over! Press any key to restart.");
            $("body").keydown(function(){
                if(wrong){
                startOver();
                }
            });

        }
    }
    function wrong_sound(){
        var audio=new Audio("./sounds/wrong.mp3");
        audio.play();
    }



    