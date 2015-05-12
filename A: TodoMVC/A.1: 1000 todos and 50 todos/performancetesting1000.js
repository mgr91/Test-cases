var page = require('webpage').create(),
    system = require('system'),
    url = system.args[1];

page.onInitialized = function() {
  page.evaluate(function(domContentLoadedMsg) {
    document.addEventListener('DOMContentLoaded', function() {
      window.callPhantom();
    });
  });
};
 
page.onCallback = function() {
  // Fetch jQuery for easier selectors
  page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function() {
  // jQuery is loaded, now manipulate the DOM
    var time = Date.now(),
    //change to 50 for 50 todos
    //numItems = 50;
    numItems =  1000;
    // Print out the title of the page
    var title = page.evaluate(function() {
        return document.title
    });

     var length = page.evaluate(function() {
      return $('#todo-list li').length
    });

    console.log(length +" todo items in list", "--" + (Date.now()-time) + " ms");

    console.log("---   " + title + "   ---");
    //Add elements
    console.log("Adding " + numItems + " todo items...");
    for (var i=0; i<numItems; i++) {
      page.evaluate(function(num) {
        var input = $('#new-todo');
        input.focus();
        return true;
      }, i+1);
      
      page.sendEvent("keypress", "todo " + (i+1)); 
      page.sendEvent('keypress', page.event.key.Enter);
    };
    var length = page.evaluate(function() {
      return $('#todo-list li').length;
    });
    if (numItems !== length) {
        console.log("* ERROR * Created an invalid number of entries!");
    }
    console.log(length +" todo items added", "--" + (Date.now()-time) + " ms");

    // Mark the todos as complete
    console.log("Marking todos as complete...");
    page.evaluate(function() {
      $('#todo-list li').each(function(){
        $(this).find('input').click();
      });
      return true;
    }); 

    console.log(length +" todo items checked", "--" + (Date.now()-time) + " ms");

    // Destroy all todos
    console.log("Destroying todos...");
     var length = page.evaluate(function() {
      return $('#todo-list li').length;
    });
    do {
      console.log("delets");
        page.evaluate(function() {
      $('#todo-list li').each(function(){
        $(this).find('.destroy').click();
      });
      return true;
    }); 

    //page.render(title + 'after.png');

    var length = page.evaluate(function() {
      return $('#todo-list li').length;
    });

  } while(length != 0);
    console.log(length +" todo items left");

 
    // Print out total time
    time = Date.now() - time;
    console.log('Loading time ' + time + ' msec');
    console.log('----------------------------------');
    phantom.exit();
  });
};
 
page.open(url, function(status) {
 
});