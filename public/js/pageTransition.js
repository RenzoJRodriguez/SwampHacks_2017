
$(document).ready(
     function() {

          $("#question1").hide();
          $("#question2").hide();
          $("#question3").hide();
          $("#question4").hide();
          $("#question5").hide();

          // Function transitions page from main menu to another page
          $("#startButton").click(
               function(){
                    $("#mainMenu").fadeOut();
                    $("#question1").delay(1000).fadeIn('slow');
               }
          );

          $("#answer1-1, #answer1-2").click(function(){
               $("#question1").fadeOut();
               $("#question2").delay(1000).fadeIn('slow');
          });

          $("#answer2-1, #answer2-2").click(function(){
               $("#question2").fadeOut();
               $("#question3").delay(1000).fadeIn('slow');
          });

          $("#answer3-1, #answer3-2").click(function(){
               $("#question3").fadeOut();
               $("#question4").delay(1000).fadeIn('slow');
          });

          $("#answer4-1, #answer4-2").click(function(){
               $("#question4").fadeOut();
               $("#question5").delay(1000).fadeIn('slow');
          });

          $("#answer5-1, #answer5-2").click(function(){
               $("#question5").fadeOut();
               // $("#question2").delay(1000).fadeIn('slow');
               alert("Congratulations, you have completed all the questions!");
          });
});
