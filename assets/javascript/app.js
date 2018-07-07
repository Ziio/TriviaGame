var userAns;
var correctAns = 0;
var incorrectAns = 0;
var unAns = 0;
var question = 0;
var count = 30;


var triviaQ = [{
question:"1",
choices: ["1","2","3","4"],
answer: 0
}, {
    question:"2",
    choices: ["1","2","3","4"],
    answer: 1
    }, {
        question:"3",
        choices: ["1","2","3","4"],
        answer: 2
        }, {
            question:"4",
            choices: ["1","2","3","4"],
            answer: 3
            }, {
                question:"2",
                choices: ["1","2","3","4"],
                answer: 1
                }, {
                    question:"4",
                    choices: ["1","2","3","4"],
                    answer: 3
                    }
                                                            
];
$(document).ready(function() {


$("#start_button").click(function(){
    $(this).hide();
    counter = setInterval(timer, 1000);
    displayTrivia();
});

timer = function(){
    count--;
    if (count <= 0) {
        setTimeout(function() {
            nextQ();
        });

    } else { 
        $("#clock").html("Time remaining: " + "00:" + count + " secs");
    }

    
    
    return;
}

nextQ = function() {
    question++;
    clearInterval(counter);
    count = 30;
    $("#clock").html("");
    setTimeout(function() {

    })
}



function displayTrivia() {
    $("#question").html(triviaQ[0].question);
    question++;
    
      var choicesArr = triviaQ[0].choices;
    
      for (let i = 0; i < choicesArr.length; i++) {
        var button = $('<button>');
        button.text(choicesArr[i]);
        button.attr('data-id', i);
        $('#choices').append(button);
       }
    
      } 
    
     $('#choices').on('click', 'button', function(){
     userPick = $(this).data("id");
     triviaQ[0].answer;
     if(userPick != triviaQ[0].answer) {
    
     $('#choices').text("Correct!");
     incorrectAns++;
    
    } else if (userPick === triviaQ[0].answer) {
    $('#choices').text("Correct!!!");
    correctAns++;
    
    }
    
    });

});

