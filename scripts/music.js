var port = chrome.runtime.connect({name: "knockknock"});
port.postMessage({joke: "Knock knock"});
port.onMessage.addListener(function(msg) {
  if (msg.question == "Who's there?") {
    console.log('who\'s there?');
    port.postMessage({answer: "Madame"});
  }
  else if (msg.question == "Madame who?") {
    console.log('madame who?');
    port.postMessage({answer: "Madame... Bovary"});
  }

  if(msg.action !== undefined){
  	var button;
  	switch(msg.action){
  		case "play":
  		case "pause":
  			button=$("button[data-id='play-pause']");
  			break;
  		case "repeat":
  			button=$("button[data-id='repeat']");
  			break;
  		case "shuffle":
  			button=$("button[data-id='shuffle']");
  			break;
  	}
  	triggerMouseEvent(button,'click');

  }

});

function triggerMouseEvent(element, eventname){
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent(eventname, true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, element);
    element.dispatchEvent(event);
}