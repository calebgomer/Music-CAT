// Imports the requirements
var self = require("sdk/self");
var widgets = require("sdk/widget");
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var self = require("sdk/self");

// Construct a panel
// This panel will be where the music controls are located
var controls = panels.Panel({
  width: 350,
  height: 160,
  contentURL: [self.data.url("popup.html"),
  			   "https://play.google.com/music/listen#/"],
  contentScriptFile: [self.data.url("scripts/jquery.js"),
                      self.data.url("scripts/popup.js")]
});
 
// Create a widget, and attach the panel to it
// This what will be seen on the addon bar
var widget = widgets.Widget({
  label: "Music Controls",
  id: "music-control",
  contentURL: data.url("images/icon.ico"),
  panel: controls
});

var playKey = Hotkey({
  combo: "control-shift-space",
  onPress: function() {
    Keyboard("playPause");
}
});

var prevKey = Hotkey({
combo: "control-shift--left",
onPress: function() {
  KeyBoard("prevSong");
}
});

var nextKey = Hotkey({
combo: "control-shift--right",
onPress: function() {
  gMusicAction("nextSong");
}
});
var gMusicAction = function(act) {
console.log(act);
var gmusictab = 'https?\:\/\/music\.google\.com\/music\/listen.*';
for each (var tab in tabs)
  if (tab.url.match(gmusictab)) {
    console.log("location.assign('javascript:SJBpost(\"" + act + "\");void 0');");
    tab.attach({
      contentScript: "location.assign('javascript:SJBpost(\"" + act + "\");void 0');self.postMessage(document.getElementById(\"playPause\").title);",
                      
                      onMessage: function (message) {                              
                        if(message == 'Pause'){updateWidgetPP('play');}else{updateWidgetPP('pause');}
                      }
      });
  }
};
 