chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "Knock knock") {
      console.log('who\'s there');
      port.postMessage({question: "Who's there?"});
    } else if (msg.answer == "Madame") {
      console.log('madame who?');
      port.postMessage({question: "Madame who?"});
    } else if (msg.answer == "Madame... Bovary") {
      console.log('I dont get it?');
      port.postMessage({question: "I don't get it."});
    }
  });
});
