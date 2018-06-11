// Copyright 2017, John Channell
// Open Source via MIT License
// 10/06/2017

// Input streams here
/* 	Template:
	{"name": "StreamName", "link": "OnlineRadioStreamLink"}
*/
var streamList = [
	`{ 
		"streams": [
			{"name": "103.7 The Q", "link": "http://wqen-fm.akacast.akamaistream.net/7/895/31814/v1/auth.akacast.akamaistream.net/wqen-fm"},
			{"name": "Example 1", "link": ""},
			{"name": "Example 2", "link": ""},
			{"name": "Example 3", "link": ""}
		]
	}`
]
var _streamList = JSON.parse(streamList);

////////
// Version Log Variable
////////
var versionLog = `Version 1.0.0
	- See Radio Help for more information on how to use the system.
	- Copyright 2017, John Channell.
	- Run "radioHelp()" for list of commands.
`;

////////
// Set Variables
////////
var streamName = document.getElementById("streamName");
var	radioAudio = document.getElementById("radioAudio");
var radioSource = document.getElementById("radioSource");
var radioVolume = document.getElementById("radioVolume");
var volumeSlider = document.getElementById("volumeSlider");
var streamSelect = document.getElementById("selectStation");
var ran = false;
var volume;

////////
// Name: Change Station
// Desc: Takes the select input, and selects the appropriate station.
////////
function changeStation(x) {
	if (_streamList.streams[x] == undefined) {
		return console.warn("Not Found:\nStream was not found in Stream List.");
	}
	streamName.innerHTML = _streamList.streams[x].name;
	radioAudio.load();
	radioSource.src = _streamList.streams[x].link;
}

////////
// Name: Clock
// Desc: Tells the current time based on how many seconds since 01/01/1970.
////////
function clock() {
	var date = new Date();
	var mins = date.getMinutes();
	var hours = date.getHours();
	var secs = date.getSeconds();
	if (hours==0) {
		if (mins < 10) {
			if (secs < 10) {
				var currenttime = "12"+":0"+mins+":0"+secs+" AM";
			} else {
				var currenttime = "12"+":0"+mins+":"+secs+" AM";
			}
		} else if (mins > 9) {
			if (secs < 10) {
				var currenttime = "12"+":"+mins+":0"+secs+" AM";
			} else {
				var currenttime = "12"+":"+mins+":"+secs+" AM";
			}
		}
	} else if (hours!=0) {
		if (hours < 12) {
			if (mins < 10) {
				if (secs < 10) {
					var currenttime = hours+":0"+mins+":0"+secs+" AM";
				} else {
					var currenttime = hours+":0"+mins+":"+secs+" AM";
				}
			} else if (mins > 9) {
				if (secs < 10) {
					var currenttime = hours+":"+mins+":0"+secs+" AM";
				} else {
					var currenttime = hours+":"+mins+":"+secs+" AM";
				}
			}
		} else if (hours > 12) {
			if (mins < 10) {
				if (secs < 10) {
					var currenttime = hours-12+":0"+mins+":0"+secs+" PM";
				} else {
					var currenttime = hours-12+":0"+mins+":"+secs+" PM";
				}
			} else if (mins > 9) {
				if (secs < 10) {
					var currenttime = hours-12+":"+mins+":0"+secs+" PM";
				} else {
					var currenttime = hours-12+":"+mins+":"+secs+" PM";
				}
			}
		}
	}
	document.getElementById("localTime").innerHTML = ("Local Time: "+currenttime)
	setTimeout(clock,0.1);
}

////////
// Name: Change Volume
// Desc: Takes the input of the volume slider, and sets the audio to that volume.
////////
function changeVolume(x) {
	if (x <= 0) {
		return console.warn("Volume is not valid");
	}
	if (x == undefined) {
		x = 50;
	}
	console.log(x)
	volumeSlider.value = x;
	radioVolume.innerHTML = "Volume: "+x+"%";
	volume = x/100;
	radioAudio.volume = volume;
}

////////
// Name: Build Stream List
// Desc: Uses the JSON Array to insert the streams into the stream select input.
////////
function buildStreamList() {
	if (!ran) {
		for (var i = 0; i < _streamList.streams.length; i++) {
			streamSelect.innerHTML += '<option value="'+i+'">'+_streamList.streams[i].name+'</option>';
		}
		ran = true;
	} else {
		return console.warn("Stream list already built.")
	}
}

////////
// Name: Console Version Log
// Desc: Display a line that will show what version, and updates, of the Radio Player.
////////
function consoleVersionLog() {
	console.log(versionLog);
}

////////
// Name: Radio Help
// Desc: Takes the select input, and selects the appropriate station.
////////
function radioHelp() {
	console.log(
	`Commands
	- changeVolume(Number): Change the volume to a setting of 0 - 100
	- changeStation(Number): Change to the station to the corresponding number in the array.
	- consoleVersionLog(): Display the version and starting message in the console.`
	)
}

////////
// Callbacks
////////
clock();
changeVolume(100);
buildStreamList();
consoleVersionLog();
