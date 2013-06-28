function changeBackground(){
	chrome.tabs.executeScript(null,
                           {code:"console.log('red')"});
}