var questionArray = ["Question 1","Question 2","Question 3","Question 4","Question 5"];
var answerArray = [["Answer1","Answer2"],
                   ["Answer1","Answer2"],
                   ["Answer1","Answer2"],
                   ["Answer1","Answer2"],
                   ["Answer1","Answer2"]];

var currentQuestion = 0;
var currentAnswer;

var cursor; //element by id

function setQuestionAndArray()
{
    var uniques = chance.unique(chance.natural, 2, {min: 0, max: 1});
    
    $("#button1").removeClass("correctButton");
    $("#button2").removeClass("correctButton");
    
    $("#questionDiv").html(questionArray[currentQuestion]);
    
    currentAnswer = answerArray[currentQuestion][1];
    
    var btn1Text = answerArray[currentQuestion][uniques[0]];
    var btn2Text = answerArray[currentQuestion][uniques[1]];
    
    $("#button1").html(btn1Text);
    $("#button2").html(btn2Text);
    
    if(btn1Text == currentAnswer)
    {
        $("#button1").addClass("correctButton");
    }
    else
    {
        $("#button2").addClass("correctButton");
    }
    
    $("#questionSet").delay(1000).fadeIn('slow');
    
    currentQuestion++;
}

function collision($div1, $div2)
{
    
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
    
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
    {
        return false;
    }
    
    return true;
}

$(document).ready(
                  function() {
                  
                  var test = $('#test'); //testing collision function
                  var ball = $('#ball');
                  var fired = false;
                  var field = $('#field');
                  ball.css('top', parseInt(field.height())/2);
                  ball.css('left', parseInt(field.width())/2);
                  
                  var fieldHeight = parseInt(field.height()); //allows aimer to be placed in middle
                  var fieldWidth = parseInt(field.width());
                  
                  var inContact = false;
                  var initialPosX = ball.offset().left;
                  var initialPosY = ball.offset().top;
                  var leapConstX =  200; //prev = 36.0
                  var leapConstY = 219.0;

                  
                  //div for
                  $("#questionSet").hide();
                  
                  //initial start occurs
                  if(collision($("#startButton"),cursor))
                  {
                    function(){
                    $("#mainMenu").fadeOut();
                    setQuestionAndArray();
                  
                    }
                    );
                  }

                  cursor = ball;

                  // Function transitions page from main menu to another page
                  if(collision($(".correctButton"),cursor) && fired)
                  {
                      
                      $("#questionSet").delay(1000).fadeOut('slow');
//                  setQuestionAndArray();
                        console.log("We did it fam");
                  }
                  else if(collision($(".correctButton"),cursor) && !fired)
                  {
                      //nothing happen
                      //change button to invert
                  }
                  else
                  {
                      //some fancy error animation
                      //incorrect
                  }
                  
  
                  //plugin javascript
                  Leap.loop({
            
                            hand: function(hand){
                            var positionArray = hand.palmPosition;
            
                            var currentX = positionArray[0] + initialPosX - leapConstX;
                            var currentY = positionArray[1] + initialPosY - leapConstY;
                            var currentZ = positionArray[2];
            
                            if(currentY <= 172) {
                            currentY = 172;
                            }
            
                            if(currentZ < 0 && !fired) {
                            //console.log('BOOM');
                            ball.addClass('animated bounceIn');
                            if(collision(ball, test)) {
                            inContact = true;
                            }
                                fired = true;
                            }
            
                            if(currentZ > 0) {
                                ball.removeClass('animated bounceIn');
                                fired = false;
                            }
            
                            if(collision(ball, test)) {
                                console.log('COLLISION');
                            }
            
                            var topPos = fieldHeight - parseInt(currentY - ball.height()/2);
                            var leftPos = parseInt(currentX *1.5 - ball.width()/2); //we nerds
            
                            ball.css('top', topPos + "px");
                            ball.css('left', leftPos + "px");
            
            
                            }
            
            }).use('screenPosition', {scale: 0.25});
  

}
);
