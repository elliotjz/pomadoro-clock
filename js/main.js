

$(document).ready(function() {
  
  var sessionLength = 25;
  var breakLength = 5;
  var started = false;
  var inSession = true;
  var timeLeft = [sessionLength, 0];
  
  
  // Modify Session length
  $("#session-minus").click(function(){
    if (sessionLength > 1) {
      sessionLength --;
      $("#session-time").html(sessionLength);
      reset();
    }
  });
  
  $("#session-plus").click(function(){
    sessionLength ++;
    $("#session-time").html(sessionLength);
    reset();
  });
  
  
  // Modify Break Length
  $("#break-minus").click(function(){
    if (breakLength > 1) {
      breakLength --;
      $("#break-time").html(breakLength);
      reset();
    }
  });
  
  $("#break-plus").click(function(){
    breakLength ++;
    $("#break-time").html(breakLength);
    reset();
  });
  
  
  // Start button handler
  $("#start").click(function() {
    if (started) {
      reset();
    } else {
      startFn();
    }
  });
  
  function startFn() {
    startTimer();
    $("#start").html("RESET");
    $("#start").css("backgroundColor", "#D9853B");
    $("#start").css("color", "black");
  }
  
  function reset() {
    started = false;
    timeLeft = [sessionLength, 0];
    inSession = true;
    started = false;
    updateTimeLeft();
    $("#start").html("START");
    $("#start").css("backgroundColor", "black");
    $("#start").css("color", "#D9853B");
    $("#period").html("Session");
    $("#clock").css("backgroundColor", "#ECECEA");
  }
  
  
  function updateTimeLeft() {
    if (timeLeft[0] < 10 && timeLeft[1] < 10) {
        $("#time-left").html("0" + timeLeft[0] + ":0" + timeLeft[1]);
      } else if(timeLeft[0] < 10) {
        $("#time-left").html("0" + timeLeft[0] + ":" + timeLeft[1]);
      } else if(timeLeft[1] < 10) {
        $("#time-left").html(timeLeft[0] + ":0" + timeLeft[1]);
      } else {
        $("#time-left").html(timeLeft[0] + ":" + timeLeft[1]);
      }
  }
  
  
  function startTimer() {
    started = true;
    
    function decrement() {
      if (!started) {
        clearInterval(tick);
      } else {
        if (timeLeft[1] === 0) {
          timeLeft[0] --;
          timeLeft[1] = 59;
        } else {
          timeLeft[1] --;
        }
        updateTimeLeft();
        if (timeLeft[0] === 0 && timeLeft[1] === 0) {
          var audio = document.getElementById("audio");
          audio.play();
          switchSessionBreak();
          clearInterval(tick);
        } // end if
      } // end else
    } // end decrement function

    var tick = setInterval(decrement, 1000);

  } // end start timer function
  
  
  function switchSessionBreak() {
    if (inSession) {
      $("#period").html("Break");
      timeLeft = [breakLength, 0];
      $("#clock").css("backgroundColor", "#D9853B");
    } else {
      $("#period").html("Session");
      timeLeft = [sessionLength, 0];
      $("#clock").css("backgroundColor", "#ECECEA");
    }
    inSession = !inSession;
    startTimer();
  }
});