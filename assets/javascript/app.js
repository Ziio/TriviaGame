$(document).ready(function(){
  
    $("#countdown").hide();
    $("#start").on("click", trivia.startGame);
    $(document).on("click" , ".option", trivia.guessChecker);
    
  })
  
  var trivia = {

    timer: 10,
    timerOn: false,
    timerId : " ",
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,


    questions: {
      q1: "What is my dogs name?",
      q2: "What is my favorite color?",
      q3: "What laptop am I using?",
      q4: "What is my ethnicity",
      q5: "When does class start for me on Saturday?",
      q6: "What state do we live in?",
      q7: "What do I always bring to class to drink?",
      q8: "How early am I usually for class?",
      q9: "What is my favorite number?",
      q10: "What do I do as a part time job?"

    },
    options: {
      q1: ["Nova", "FishTaco", "Bob", "Obama"],
      q2: ["Red", "Pink", "Black", "Blue"],
      q3: ["Windows", "Acer", "Apple", "Dell"],
      q4: ["Asian", "African-American", "White", "Hispanic"],
      q5: ["11pm", "2pm", "10am", "6pm"],
      q6: ["New York","North Carolina","Delaware","Virgina"],
      q7: ["Beer","Juice","Nothing","Coffee"],
      q8: ["Never Early", "15 minutes", "30 minutes","1 hour"],
      q9: ["9", "2", "6", "7"],
      q10: ["Flight Attendant", "Truck Driver", "Bartender", "Yoga Instructor"]
    },
    answers: {
      q1: "Nova",
      q2: "Black",
      q3: "Apple",
      q4: "Asian",
      q5: "10am",
      q6: "North Carolina",
      q7: "Coffee",
      q8: "30 minutes",
      q9: "9",
      q10: "Bartender"
    },

    startGame: function(){

      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      

      $("#game").show();
      $("#results").html(" ");
      $("#timer").text(trivia.timer);
      $("#start").hide();
      $("#countdown").show();
      

    trivia.nextQuestion();

    },

    nextQuestion : function(){
      

    trivia.timer = 10;
        $("#timer").removeClass("last-seconds");
        $("#timer").text(trivia.timer);  

      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);

        
      }
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $("#question").text(questionContent);
      

      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      

      $.each(questionOptions, function(index, key){
        $("#options").append($('<button class="option btn btn-info btn-lg">'+ key + "</button>"));
      })
      
    },

    timerRunning : function(){

      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $("#timer").text(trivia.timer);
        trivia.timer--;

      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $("#results").html("<h3>Time's Up! The answer was: " + Object.values(trivia.answers)[trivia.currentSet] + "</h3>");
      }
    
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        

        $("#results")
          .html("<h3>Play again?</h3>" +
          "<p>Correct: " + trivia.correct +"</p>" +
          "<p>Incorrect: " + trivia.incorrect + "</p>" +
          "<p>Unaswered: " + trivia.unanswered + "</p>" +
          "<p>Game Over!</p>");
        
    
        $("#game").hide();
        $("#start").show();
      }
      
    },

    guessChecker : function() {
    
      var resultId;
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){

        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $("#results").html("<h3>Correct!</h3>");
      }
      else{
    
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $("#results").html("<h3>Oh no! " + currentAnswer + "</h3>");
      }
      
    },
  
    guessResult : function(){
      
      trivia.currentSet++;
    
      $(".option").remove();
      $("#results h3").remove();
      
      trivia.nextQuestion();
       
    }
  
  }