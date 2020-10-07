$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

//**NEEDED FOR BROWSER-SYNC**
// JHU Additional Step 2d
// create a function that produces a random number from 1 to 5 (inclusively).

// function randNumber1through5(){
//   return Math.floor(5 * Math.random()) + 1;
// };

// **DOES NOT WORK ON GITHUB, ONLY WITH BROWSER-SYNC
// JHU Additional Step 2e
// Use that random function to assign values to each classX property. An empty star should have its class value be class="fa fa-star-o". 
// A filled star should have its class value be class="fa fa-star". The empty star, if any, should be the last one in the list.

// NOTES: The insertProperty function as I saw it is explicitly used to change the contents of the propName within "{{ }}"
// JavaScript does not seem to have an overload feature to build versions of functions with alternate paramaters so I kept it within
// terms of how the Question was asked.
// A classmate asked this question in the forums but did not get an answer.
// If there is a way to implement the current insertProperty function to set the rating please let me know. Thanks!
// Also as mentioend in the about.html, the class name for stars is different in Font Awesome 5.

// function randRating(){
//   //Randomly generate the number of stars using function from 2d
//   var numberOfStars = randNumber1through5();
  
//   // From the first span up until the number of stars, set the class to fill in the stars.
//   for(var i = 0; i < numberOfStars; i++){
//     document.getElementById('main-content').getElementsByTagName('span')[i].className = "fas fa-star";
//   }

//   // From the span after the number of stars (array index = number of stars) to 5, set the class to put empty stars
//   for(var j = numberOfStars; j < 5; j++){
//     document.getElementById('main-content').getElementsByTagName('span')[j].className = "far fa-star";
//   }

//   // JHU Additioanl Step 3 
//   // Display the numeric/textual number of stars right next to the star icons. For example, after the 4 filled 
//   // in stars and one empty star, it should say the words “4-star rating”.
  
//   // NOTE: Using thie DOM method we can set the inner HTML of the last span element to show the textual rating
//   document.getElementById('main-content').getElementsByTagName('span')[4].innerHTML = " " + numberOfStars + "-Star Rating";
// }



(function (global) {

var dc = {};

var homeHtmlUrl = "snippets/home-snippet.html";

//Tested insertHTML with url below, did not work.
//var aboutUrl = "snippets/about.html";

var allCategoriesUrl =
  "https://davids-restaurant.herokuapp.com/categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";
var menuItemsUrl =
  "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
var menuItemsTitleHtml = "snippets/menu-items-title.html";
var menuItemHtml = "snippets/menu-item.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") === -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// TODO: STEP 0: Look over the code from
// *** start ***
// to
// *** finish ***
// below.
// We changed this code to retrieve all categories from the server instead of
// simply requesting home HTML snippet. We now also have another function
// called buildAndShowHomeHTML that will receive all the categories from the server
// and process them: choose random category, retrieve home HTML snippet, insert that
// random category into the home HTML snippet, and then insert that snippet into our
// main page (index.html).
//
// TODO: STEP 1: Substitute [...] below with the *value* of the function buildAndShowHomeHTML,
// so it can be called when server responds with the categories data.

// *** start ***
// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  allCategoriesUrl,
  buildAndShowHomeHTML, // ***** <---- TODO: STEP 1: Substitute [...] ******
  true); // Explicitly setting the flag to get JSON from server processed into an object literal
});
// *** finish **


// Builds HTML for the home page based on categories array
// returned from the server.
function buildAndShowHomeHTML (categories) {

  // Load home snippet page
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtml) {

      // TODO: STEP 2: Here, call chooseRandomCategory, passing it retrieved 'categories'
      // Pay attention to what type of data that function returns vs what the chosenCategoryShortName
      // variable's name implies it expects.

      var chosenCategoryShortName = chooseRandomCategory(categories);

      // TODO: STEP 3: Substitute {{randomCategoryShortName}} in the home html snippet with the
      // chosen category from STEP 2. Use existing insertProperty function for that purpose.
      // Look through this code for an example of how to do use the insertProperty function.
      // WARNING! You are inserting something that will have to result in a valid Javascript
      // syntax because the substitution of {{randomCategoryShortName}} becomes an argument
      // being passed into the $dc.loadMenuItems function. Think about what that argument needs
      // to look like. For example, a valid call would look something like this:
      // $dc.loadMenuItems('L')
      // Hint: you need to surround the chosen category short name with something before inserting
      // it into the home html snippet.

      var homeHtmlToInsertIntoMainPage = homeHtml;
      homeHtmlToInsertIntoMainPage = insertProperty(homeHtmlToInsertIntoMainPage, "randomCategoryShortName", "'" + chosenCategoryShortName.short_name + "'");

      // TODO: STEP 4: Insert the the produced HTML in STEP 3 into the main page
      // Use the existing insertHtml function for that purpose. Look through this code for an example
      // of how to do that.

      insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
    },
    false); // False here because we are getting just regular HTML from the server, so no need to process JSON.
}


// JHU Additional Step 2a
// Change the link to the ‘About’ page such that the contents of the about.html snippet are loaded 
// within the same index.html page, replacing the ‘home’ view content.

dc.loadAboutContent = function() {
  showLoading("#main-content");
  $('#main-content').load("/snippets/about.html");
  

  //Error Notes
  //Attempted method three ways but AJAX seemed the safest.
  //Looked into AJAX/jQuery more after watching the lecture video. I like jQuery a lot!
  //Found examples for object and embed on w3schools:
  //https://www.w3schools.com/tags/tag_object.asp
  //https://www.w3schools.com/tags/tag_embed.asp
  //document.getElementById('main-content').innerHTML = "<object data=/snippets/about.html></object>";
  //document.getElementById('main-content').innerHTML = "<embed type=\"text/html\" src= \"/snippets/about.html\">";
  
  //Calling randRating function to automatically generate rating without using setTimeout() craeted an error,
  //Uncaught TypeError: Cannot set property 'className' of undefined
  //Looked through the lectures and googled for hours but could not find anything substantial on Stack Overflow, etc.
  //My best guess is that I have some type of race condition where the asynchronous change is going faster than the DOM can detect
  //the new span elements from the about.html
  //If there is a better way to do this please let me know! Thanks!
  
  //randRating();

  //Without setTimeout method I would get a null reference error so I delayed the operation 250 milliseconds and it worked
  //Found how to use setTimeout function on w3schools,
  //https://www.w3schools.com/jsref/met_win_settimeout.asp
  //WORKS on browser-sync
  //setTimeout(randRating, 1000);
};


// JHU Additional Step 2d
// create a function that produces a random number from 1 to 5 (inclusively).

function randNumber1through5(){
  return Math.floor(5 * Math.random()) + 1;
};

// **BELOW DOES NOT WORK WITHOUT A BUTTON in about.html TO MANUALLY REFRESH.**
// JHU Additional Step 2e
// Use that random function to assign values to each classX property. An empty star should have its class value be class="fa fa-star-o". 
// A filled star should have its class value be class="fa fa-star". The empty star, if any, should be the last one in the list.

// BIG ISSUE: When trying to implement the below in the loadAboutContent function I kept getting the same type error of referencing
// undefined. Even using setTimeout() did not resolve the issue.

dc.randRating = function(){
  //Randomly generate the number of stars using function from 2d
  var numberOfStars = randNumber1through5();
  
  // From the first span up until the number of stars, set the class to fill in the stars.
  for(var i = 0; i < numberOfStars; i++){
    document.getElementById('main-content').getElementsByTagName('span')[i].className = "fas fa-star";
  }

  // From the span after the number of stars (array index = number of stars) to 5, set the class to put empty stars
  for(var j = numberOfStars; j < 5; j++){
    document.getElementById('main-content').getElementsByTagName('span')[j].className = "far fa-star";
  }

  // JHU Additioanl Step 3 
  // Display the numeric/textual number of stars right next to the star icons. For example, after the 4 filled 
  // in stars and one empty star, it should say the words “4-star rating”.
  
  // NOTE: Using thie DOM method we can set the inner HTML of the last span element to show the textual rating
  document.getElementById('main-content').getElementsByTagName('span')[4].innerHTML = " " + numberOfStars + "-Star Rating";
}


// Given array of category objects, returns a random category object.
function chooseRandomCategory (categories) {
  // Choose a random index into the array (from 0 inclusively until array length (exclusively))
  var randomArrayIndex = Math.floor(Math.random() * categories.length);

  // return category object with that randomArrayIndex
  return categories[randomArrayIndex];
}


// Load the menu categories view
dc.loadMenuCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};


// Load the menu items view
// 'categoryShort' is a short_name for a category
dc.loadMenuItems = function (categoryShort) {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    menuItemsUrl + categoryShort,
    buildAndShowMenuItemsHTML);
};


// Builds HTML for the categories page based on the data
// from the server
function buildAndShowCategoriesHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive();

          var categoriesViewHtml =
            buildCategoriesViewHtml(categories,
                                    categoriesTitleHtml,
                                    categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}


// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}



// Builds HTML for the single category page based on the data
// from the server
function buildAndShowMenuItemsHTML (categoryMenuItems) {
  // Load title snippet of menu items page
  $ajaxUtils.sendGetRequest(
    menuItemsTitleHtml,
    function (menuItemsTitleHtml) {
      // Retrieve single menu item snippet
      $ajaxUtils.sendGetRequest(
        menuItemHtml,
        function (menuItemHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive();

          var menuItemsViewHtml =
            buildMenuItemsViewHtml(categoryMenuItems,
                                   menuItemsTitleHtml,
                                   menuItemHtml);
          insertHtml("#main-content", menuItemsViewHtml);
        },
        false);
    },
    false);
}


// Using category and menu items data and snippets html
// build menu items view HTML to be inserted into page
function buildMenuItemsViewHtml(categoryMenuItems,
                                menuItemsTitleHtml,
                                menuItemHtml) {

  menuItemsTitleHtml =
    insertProperty(menuItemsTitleHtml,
                   "name",
                   categoryMenuItems.category.name);
  menuItemsTitleHtml =
    insertProperty(menuItemsTitleHtml,
                   "special_instructions",
                   categoryMenuItems.category.special_instructions);

  var finalHtml = menuItemsTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over menu items
  var menuItems = categoryMenuItems.menu_items;
  var catShortName = categoryMenuItems.category.short_name;
  for (var i = 0; i < menuItems.length; i++) {
    // Insert menu item values
    var html = menuItemHtml;
    html =
      insertProperty(html, "short_name", menuItems[i].short_name);
    html =
      insertProperty(html,
                     "catShortName",
                     catShortName);
    html =
      insertItemPrice(html,
                      "price_small",
                      menuItems[i].price_small);
    html =
      insertItemPortionName(html,
                            "small_portion_name",
                            menuItems[i].small_portion_name);
    html =
      insertItemPrice(html,
                      "price_large",
                      menuItems[i].price_large);
    html =
      insertItemPortionName(html,
                            "large_portion_name",
                            menuItems[i].large_portion_name);
    html =
      insertProperty(html,
                     "name",
                     menuItems[i].name);
    html =
      insertProperty(html,
                     "description",
                     menuItems[i].description);

    // Add clearfix after every second menu item
    if (i % 2 !== 0) {
      html +=
        "<div class='clearfix visible-lg-block visible-md-block'></div>";
    }

    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}


// Appends price with '$' if price exists
function insertItemPrice(html,
                         pricePropName,
                         priceValue) {
  // If not specified, replace with empty string
  if (!priceValue) {
    return insertProperty(html, pricePropName, "");
  }

  priceValue = "$" + priceValue.toFixed(2);
  html = insertProperty(html, pricePropName, priceValue);
  return html;
}


// Appends portion name in parens if it exists
function insertItemPortionName(html,
                               portionPropName,
                               portionValue) {
  // If not specified, return original string
  if (!portionValue) {
    return insertProperty(html, portionPropName, "");
  }

  portionValue = "(" + portionValue + ")";
  html = insertProperty(html, portionPropName, portionValue);
  return html;
}


global.$dc = dc;

})(window);