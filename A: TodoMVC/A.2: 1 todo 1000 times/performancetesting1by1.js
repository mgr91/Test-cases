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
    numItems =  1000;
    // Print out the title of the page
    var title = page.evaluate(function() {
        return document.title
    });

    console.log("---   " + title + "   ---");
    //Add elements
    for (var i=0; i<numItems; i++) {
      //Adding todo item
      page.evaluate(function(num) {
        var input = $('#new-todo');
        input.focus();
        return true;
      }, i+1);
      page.sendEvent("keypress", "todo " + (i+1)); 
      page.sendEvent('keypress', page.event.key.Enter);

      //checking todo item
      page.evaluate(function() {
        $('#todo-list li').each(function(){
          $(this).find('input').click();
        });
        return true;
      }); 
      
      //delete todo item
      page.evaluate(function() {
        $('#todo-list li').each(function(){
          $(this).find('.destroy').click();
        });
        return true;
      }); 

      if(i%100 === 0) {
        console.log((i*100)/numItems, "% done");
      }
    };

    // Print out total time
    time = Date.now() - time;
    console.log('Loading time ' + time + ' msec');
    console.log('----------------------------------');
    phantom.exit();
  });
};
 
page.open(url, function(status) {
 
});