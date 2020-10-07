// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)

(function (window){
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  // STEP 10:
  // Loop over the names array and say either 'Hello' or "Good Bye"
  // using the 'speak' method or either helloSpeaker's or byeSpeaker's
  // 'speak' method.
  // See Lecture 50, part 1
  
  // Commented out below as assignment said only console output should 
  // be steps 12, JHU Additional Step 2, and Optional Step 3
  // Uncommmenting will work

  // console.log("Step 10 using helloSpeaker's speak method:");
  // for (var i = 0; i < names.length; i++) {
  //   helloSpeaker.speak(names[i]);
  // }
  
  console.log("\nStep 12:")
  for (var i = 0; i < names.length; i++) {
  
    // STEP 11:
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
  
    var firstLetter = names[i].charAt(0).toLowerCase();

    // STEP 12:
    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
  
    if(firstLetter === "j"){
      byeSpeaker.speak(names[i]);
    }
    else{
      helloSpeaker.speak(names[i]);
    }
  }

  // JHU Additional Step 2a Test
  
  // console.log("\nJHU Additional Step 2a using byeSpeaker's speakSimple method:");
  // for(var i = 0; i < names.length; i++){
  //   //console.log(helloSpeaker.speakSimple(names[i]));
  //   console.log(byeSpeaker.speakSimple(names[i]));
  // }

  // JHU Additional Step
  // 2b. In the main script.js, use the map function to create an array based on the names 
  // array. This array will contain the greetings based on the names with the same rules as implemented 
  // previously. The function passed into the map function should not be an inline function, i.e., separate 
  // it into its own named function and pass it into the map function as a value. The end result should be 
  // that the list prints out twice in the browser console after you complete this part.
  
  function namesToGreetings(name){
    var firstLetter = name.charAt(0).toLowerCase();

    if(firstLetter === "j"){
      return byeSpeaker.speakSimple(name);
    }
    else{
      return helloSpeaker.speakSimple(name);
    }
  }
 
  const newNamesArray = names.map(name => namesToGreetings(name));

  console.log("\nJHU Additional Step 2b:");
  for(var i = 0; i < newNamesArray.length; i++){
    console.log(newNamesArray[i]);
  }

  // JHU Optional Step
  // 3b. In the main script.js, use the reduce function to create 2 separate arrays: one with all the ‘hello’ 
  // greetings and another with all the good bye greetings. Then, loop over each array (obviously separately) 
  // and print out the greetings to the console with console.log. You are required to use {hello: [], bye: []} 
  // as your initialValue. 

  const reduced_names = names.reduce(
    function(accumulator, currentValue, currentIndex){ 
      accumulator.hello[currentIndex] = helloSpeaker.speakSimple(currentValue);
      accumulator.bye[currentIndex] = byeSpeaker.speakSimple(currentValue);
      return accumulator;
  }, {hello: [], bye: []} );
  
  console.log("\nJHU Optional Step 3b Hello and Good Bye:")
  for(var i = 0; i < reduced_names.hello.length; i++){
    console.log(reduced_names.hello[i]);
  }

  for(var i = 0; i < reduced_names.bye.length; i++){
    console.log(reduced_names.bye[i]);
  }
  
})(window);