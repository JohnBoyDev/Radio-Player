// John Channell | The following is an example of what you can listen to, edit as you please.
	// Each StreamURL must have a title, and background color with it. Add an extra line per stream, even if blank.

var Streams = [
"http://wqen-fm.akacast.akamaistream.net/7/895/31814/v1/auth.akacast.akamaistream.net/wqen-fm.mp3",
"http://wmjj-hd2.akacast.akamaistream.net/7/661/129338/v1/auth.akacast.akamaistream.net/wmjj-hd2",
"http://wdxb-fm.akacast.akamaistream.net/7/337/31813/v1/auth.akacast.akamaistream.net/wdxb-fm",
]
// Template: "radio.example.com:8000", "Stream Name", "#000000"
	// Make sure that you include each space, even if it must be blank.

var Streamnames = [
"103.7 The Q",
"104.1 The Beat",
"102.5 The Bull",
]
// The name of your stream. i.e. The best of the 80s! or The top hits!

var Backgroundcolors = [
"#F42330",
"#256DA1",
"#DFCC8F",
]
// The color for the background, default is gray, use hex code. i.e. #000000

var Boxshape = true;
// Determines if corners are rounded or not, false means rounded, true means sharp.

var BigPlayer = false;
// true means big player, for mobile pages, and false is a more compact size for desktops.

var RadioHelpLocation = "radiohelp.html";
// Location of the help file parallel to the website this is file built on.

var Version = "3.0";
// Set by the developer, whenever you decide to make a change, add 0.1 to the version.

/* Update Log

/ 2.1
-- Added "Local Time"
-- Automated Streams
-- Added more HELP topics.

/ 2.2
-- UI Changes
-- Added Streamlist
-- Added Streamlist Animation

/ 2.3
-- UI Changes
-- Revamped Volume

/ 3.0
-- Significant UI Change
-- Volume is now a slider

 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Functions, and Callbacks
	// Recommended that you don't touch this, but I'm not gonnna stop ya.

for (i = 0; i < Backgroundcolors.length; i++) {
	if (Backgroundcolors[i]==""||Streamnames[i]==undefined) {
		Backgroundcolors[i] = "#777"
	}
}

for (i = 0; i < Streamnames.length; i++) {
	if (Streamnames[i]=="") {
		Streamnames[i] = "Radio Stream"
	}
}

if (Boxshape==true) {
	var BoxRadius = "0px";
} else if (Boxshape==false) {
	var BoxRadius = "17.5px";
} else {
	BoxRadius = "0px";
}

if (BigPlayer==false||window.screen.width > 800) {
	var plrwidth="32.5%";
} if (BigPlayer==true||window.screen.width < 800) {
	var plrwidth="80% ";
}

BuildCss()
BuildPlayer()

function BuildCss () {
	var css = ".Builtradio{transition:all 1s;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;border:3px solid #000;border-radius:"+BoxRadius+";width:"+plrwidth+";height:auto;margin:auto;text-align:center;background-color:"+Backgroundcolors[0]+";font-size:1.25em;}.Builtradio audio{margin:2.5%;width:95%;height:auto;display:none;}.Builtradio hr{width:95%;}.Builtradio button{transition: all .5s;width:30%;margin-right:5px;margin-bottom:15px;font-size:65%;background-color:#000;border:2px solid silver;font-weight:700;height:auto;color:#fff;padding:15px 10px;text-align:center;text-decoration:none;display:inline-block;cursor:pointer;margin:4px 2px;}.Builtradio button:hover{background-color:#3f3f3f;}.Builtradio h2{text-shadow: 0px 2px 15px #ffffff;} input[type=range] {-webkit-appearance: none;width: 70%;border-radius: 8px;height: 7px;border: 1px solid #bdc3c7;background-color: #C9C9C9;margin-bottom:2em}input[type=range]::-webkit-slider-thumb {height: 20px;width: 20px;border-radius: 50px;}.streams-content,.streams {margin:1em 0em}";
	var htmlDiv = document.createElement('div');
	htmlDiv.innerHTML = '<p>foo</p><style type="text/css">' + css + '</style>';
	document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[1]);
}

function BuildPlayer () {
	var body = document.write("<div class='Builtradio' id='Player'><div id='top'><h2 id='Title'>",Streamnames[0],"</h2><audio controls id='Builtradio' autoplay><source src=",Streams[0]," type='audio/mpeg' volume='10'><p>Your browser does not support audio streams.</p></audio><p id='Volume'>Current Volume:</p>")
	var player = document.getElementById("Builtradio");
	var defaultvolume = 50;
	var determinedname;
	var volumenotice = document.getElementById("Volume");
	var volumeslider = document.getElementById("VolSlide");
	var time = document.getElementById("Time");
	document.write("<input type='range' id='VolSlide' value='"+defaultvolume+"' oninput='volchange()'><br><button onclick='openhelp()' class='button' type='button'>Information</button></div><div id='right'><div class='streams'><div id='bottom'><b>Stream List</b><div class='streams-content'>")
	for (i = 0; i < Streams.length; i++) {
    	document.write("<button onclick='strm",i,"()' id='Streambtn",i,"' class='button' type='button'>Stream ",i+1,"<br>"+Streamnames[i]+"</button>")
    	document.write("<script type='text/javascript'> function volchange () {player.volume = document.getElementById('VolSlide').value/100}function strm",i,"() {document.getElementById('Builtradio').src='"+Streams[i]+"';document.getElementById('Title').innerHTML='"+Streamnames[i]+"';document.getElementById('Player').style.backgroundColor='"+Backgroundcolors[i]+"';}</script>")
	}
	var practicalvol = document.getElementById("VolSlide").value/100;
	player.volume = practicalvol;
	document.write("</div></div></div></div><div id='end'><hr><p>Version "+Version+"</p><p id='Time'>Time Placeholder</p></div>")
	document.write('<script type="text/javascript">var volume = ',defaultvolume,';var bgcolor=document.getElementById("Player"); var player=document.getElementById("Builtradio"); var title=document.getElementById("Title"); function openhelp() {window.open("'+RadioHelpLocation+'", "myWindow", "width=725,height=600");}</script>')
	var i;
	function go () {
		volumenotice.innerHTML = "Current Volume: "+document.getElementById("VolSlide").value+"%";
		i++;
		setTimeout(go,0.001);
	}
	function clock() {
		var date = new Date();
		var mins = date.getMinutes();
		var hours = date.getHours();
		var secs = date.getSeconds();
		if (hours==0) {
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
		document.getElementById("Time").innerHTML = ("Local Time: "+currenttime)
		i++;
		setTimeout(clock,0.05);
	}
	go();
	clock();
}

function BuildError () {
	document.write("<center id='Builtradio'><p>The stream is not available right now, please try again later.</p></center>")
}