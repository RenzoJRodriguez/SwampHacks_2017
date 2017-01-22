var questionArray = ["What's a dab","How much salt","Naruto run?","What's this? *does finger stuff*","Infinite looove"];
var answerArray = [["Answer1","Answer2"],
                   ["Answer1","Answer2"],
                   ["Answer1","Answer2"],
                   ["Answer1","Answer2"],
                   ["Answer1","Answer2"]];

var currentQuestion = 0;
var currentAnswer;
var isCollided = false;

function setQuestionAndArray()
{
    var uniques = chance.unique(chance.natural, 2, {min: 0, max: 1});

    $("#button1").removeClass("correctButton");
    $("#button2").removeClass("correctButton");

    $("#button1").css('right', 100);
    $("#button2").css('right', 300);

    currentAnswer = answerArray[currentQuestion][1];

    var btn1Text = answerArray[currentQuestion][uniques[0]];
    var btn2Text = answerArray[currentQuestion][uniques[1]];

    if(btn1Text === currentAnswer)
    {
        console.log("Btn1:"+btn1Text + " " + answerArray[currentQuestion][uniques[0]]);
        $("#button1").addClass("correctButton");
    }
    else
    {
        console.log("Btn2:"+btn2Text + " " + answerArray[currentQuestion][uniques[0]]);
        $("#button2").addClass("correctButton");
    }

    $("#questionDiv").html(questionArray[currentQuestion]);
    $("#button1").html(btn1Text);
    $("#button2").html(btn2Text);

    $("#questionSet").fadeIn(2000, function()
  {
    isCollided = false;
  });

    currentQuestion++;
}

function gameOver()
{
  //POPE TO DO;
  $(".answerButtons").hide();


  $("#questionDiv").html("Thank you for your help! Look forward to having you back here for some more debugging.");
  console.log("Thank you!");
  $("#questionSet").fadeIn(4000, function()
{
  setTimeout(12000)
  {
    location.reload();
  }
});

}


$(document).ready(function() {
      // var test = $('#test'); //testing collision function
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

      Leap.loop(function(frame){
    //console.log(frame.hands.length);
  });

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
      //div hidden for questions and answers
      $("#questionSet").hide();

                  //plugin javascript
                  Leap.loop({
                            hand: function(hand){

                              //initial start occurs
                                    if(collision($("#start"),ball) && fired)
                                    {
                                        $("#mainMenu").fadeOut(2000);
                                        $("#title").fadeOut(2000, function()
                                      {
                                        if(!isCollided)
                                        {
                                          isCollided = true;
                                          setQuestionAndArray();
                                        }
                                      });


                                    }

                                    // Function transitions page from main menu to another page
                                      if($(".answerButtons").hasClass("correctButton"))
                                      {
                                          if(collision($(".correctButton"),ball) && fired)
                                          {

                                            $("#questionSet").fadeOut(2000, function()
                                          {
                                            if(!isCollided)
                                            {
                                              isCollided = true;
                                              console.log("CQ: " + currentQuestion);
                                              if(currentQuestion > 4)
                                              {
                                                console.log("We did it fam");
                                                  gameOver();
                                              }
                                              else {
                                                setQuestionAndArray();
                                              }
                                            }
                                            else if(collision($(".correctButton"),ball) && !fired)
                                            {
                                                //nothing happen
                                                //change button to invert
                                            }
                                            else
                                            {
                                              //some fancy error animation
                                              //incorrect
                                            }
                                          });

                                          }

                                      }
                                      else {
                                        //no collision
                                      }




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
                                fired = true;
                            }

                            if(currentZ > 0)
                            {
                              ball.removeClass('animated bounceIn');
                              fired = false;
                            }

                            var topPos = fieldHeight - parseInt(currentY - ball.height()/2);
                            var leftPos = parseInt(currentX *1.5 - ball.width()/2); //we nerds

                            ball.css('top', topPos + "px");
                            ball.css('left', leftPos + "px");

                        }

            }).use('screenPosition', {scale: 0.25});


}
);
