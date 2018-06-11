![MIT Licence](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg?style=flat-square)

# Radio Player
A simple set of configuration files to make a station at the top of your page.


### Screenshots
![Rebuild Design](https://i.imgur.com/kt50Y2d.png "Rebuild Design")

### Features
Below is a section of features, and their corresponding code, so you can better understand how this project was completed.

#### Clock Feature
Without using any API, a clock is rendered on to the radio player to make the player more aesthetically pleasing.
```js
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
```

#### Volume Slider
Using an input slider, the volume can be easily  changed in miliseconds!
```js
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
```

#### JSON Stream List
Using JSON, a stream list is created that can be dynamically added manually.
```js
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
```

### Compiling The JSON Stream List
With the JSON list that was created, it adds the stations to the radio player's station selection.
```js
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
```

### License
The license used is the MIT License, which can be found here, [LICENSE](https://github.com/jbcjr3/Radio-Player/blob/master/LICENSE)
