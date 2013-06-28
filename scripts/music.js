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
});