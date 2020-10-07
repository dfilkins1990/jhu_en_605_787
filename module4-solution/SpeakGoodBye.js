// NOTE! The steps in this file are basically identical to the ones you
// performed in the SpeakHello.js file.

// STEP 6: Wrap the entire contents of SpeakGoodBye.js inside of an IIFE
// See Lecture 52, part 2

(function(window){

  // STEP 7: Create an object, called 'byeSpeaker' to which you will attach
  // the "speak" method and which you will expose to the global context
  // See Lecture 52, part 1
  
  var byeSpeaker = {};

  // STEP 8: Rewrite the 'speak' function such that it is attached to the
  // byeSpeaker object instead of being a standalone function.
  // See Lecture 52, part 2
  
  byeSpeaker.speak = function(name){
    console.log(speakWord +  " " + name);
  }

  // STEP 9: Expose the 'byeSpeaker' object to the global scope. Name it
  // 'byeSpeaker' on the global scope as well.
  
  window.byeSpeaker = byeSpeaker;

  // DO NOT attach the speakWord variable to the 'byeSpeaker' object.
  var speakWord = "Good Bye";

  // Instructions did not say to remove speak function and script.js mentions using this 
  // as an option in step 10 but this is not reachable due to step 6
  function speak(name){
    console.log(speakWord + " " + name)
  }

  // JHU Additional Step
  // 2a. Add another method called speakSimple into the SpeakGoodBye.js and SpeakHello.js 
  // that is externally exposed just like the speak method is. The speakSimple method should not 
  // use console.log, but instead should simply return the greeting concatenated to the passed in name argument.
  
  byeSpeaker.speakSimple = function(name){
    return speakWord + " " + name;
  }

})(window);