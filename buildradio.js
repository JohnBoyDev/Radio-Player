// John Channell | The following is an example of what you can listen to, edit as you please.
	// Each StreamURL must have a title, and background color with it. Add an extra line per stream, even if blank.

var Streams = [
"http://wqen-fm.akacast.akamaistream.net/7/895/31814/v1/auth.akacast.akamaistream.net/wqen-fm.mp3",
"http://wmjj-hd2.akacast.akamaistream.net/7/661/129338/v1/auth.akacast.akamaistream.net/wmjj-hd2",
"http://wdxb-fm.akacast.akamaistream.net/7/337/31813/v1/auth.akacast.akamaistream.net/wdxb-fm",
]
// The stream's url. ie. http://xxx.xxx.xxx.xxx:0000/ or http://radio.example.com:0000/

var Streamnames = [
"103.7 The Q",
"104.1 The Beat",
"102.5 The Bull",
]
// The name of your stream. ie. The best of the 80s! or The top hits!
var Backgroundcolors = [
"#F42330",
"#256DA1",
"#DFCC8F",
]
// The color for the background, default is white, use hex code. ie. #000000

var Boxshape = false;
// Determines if corners are rounded or not, false means rounded, true means sharp.

var BigPlayer = false;
// true means big player, for mobile pages, and false is a more compact size for desktops.

var RadioHelpLocation = "radiohelp.html";

var Version = "2.2";
// Set by the developer, when ever you decide to make a change, add 0.1 to the version.
/* 2.1
-- Added "Local Time"
-- Automated Streams
-- Added more HELP topics.

/ 2.2
-- UI Changes
-- Added Streamlist
-- Added Streamlist Animation



 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Functions, and Callbacks
	// Recommended that you don't touch this, but I'm not gonnna stop ya.

for (i = 0; i < Backgroundcolors.length; i++) {
	if (Backgroundcolors[i]=="") {
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
}

if (BigPlayer==false||window.screen.width > 800) {
	var btnsize="auto";
	var plrwidth="27.5%";
} else if (BigPlayer==true||window.screen.width < 800) {
	var btnsize="100px";
	var plrwidth="50% ";
}

BuildCss()
BuildPlayer()

function BuildCss () {
	var css = ".Builtradio{transition:all 1s;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;border:3px solid #000;border-radius:"+BoxRadius+";width:"+plrwidth+";height:auto;margin:auto;text-align:center;background-color:"+Backgroundcolors[0]+";font-size:1.25em;}.Builtradio audio{margin:2.5%;width:95%;height:auto;display:none;}.Builtradio hr{width:95%;}.Builtradio button{width:30%;height:"+btnsize+";margin-right:5px;margin-bottom:15px;display:inline-block;padding:0px;background-color:#000;border:2px solid silver;font-weight:700;height:auto;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;cursor:pointer;margin:4px 2px;}.Builtradio button:hover{font-weight:bold;transition:all .25s;}.Builtradio h2{text-shadow: 0px 2px 15px #ffffff;}";
	var dropdown = ".streams {transition:all 2s;position:relative;display:inline-block;margin-bottom:25px;padding:5px;width:100%;}.streams b {margin-bottom:20px;cursor:pointer;} .streams-content{padding-top:5px;transition:all .5s;overflow:hidden;max-height:0;}.streams:hover .streams-content {transition-delay: max-height 1s;max-height: 500px;opacity: 1;}"
	var htmlDiv = document.createElement('div');
	htmlDiv.innerHTML = '<p>foo</p><style type="text/css">' + css + dropdown + '</style>';
	document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[1]);
}

function BuildPlayer () {
	var body = document.write("<div class='Builtradio' id='Player'><h2 id='Title'>",Streamnames[0],"</h2><audio controls id='Builtradio' autoplay ><source src=",Streams[0]," type='audio/mpeg' volume='10'><p>You're browser does not support audio streams.</p></audio><p id='Volume'>Current Volume:</p>")
	var player = document.getElementById("Builtradio");
	player.volume = 0.2
	var volumenotice = document.getElementById("Volume");
	var time = document.getElementById("Time");
	document.write("<button onclick='up()' class='button' type='button'>Volume Up</button><button onclick='down()' class='button' type='button'>Volume Down</button><button onclick='mute()' class='button' type='button'>Volume Mute</button><button onclick='openhelp()' class='button' type='button'>Help</button><hr noshade><p>Version "+Version+"</p><p id='Time'>Time Placeholder</p><div class='streams'><b>Stream List</b><div class='streams-content'>")
	for (i = 0; i < Streams.length; i++) {
    	document.write("<button onclick='strm",i,"()' id='Streambtn",i,"' class='button' type='button'>Stream ",i+1,"</button>")
    	document.write("<script type='text/javascript'>function strm",i,"() {document.getElementById('Builtradio').src='"+Streams[i]+"';document.getElementById('Title').innerHTML='"+Streamnames[i]+"';document.getElementById('Player').style.backgroundColor='"+Backgroundcolors[i]+"';}</script>")
	}
	document.write("</div></div></div>")
	document.write('<script type="text/javascript">var bgcolor=document.getElementById("Player"); var player=document.getElementById("Builtradio"); var title=document.getElementById("Title"); function up() {player.volume=player.volume+0.1;} function down() {player.volume=player.volume-0.1;} function mute() {player.volume=0;}function openhelp() {window.open("'+RadioHelpLocation+'", "myWindow", "width=725,height=600");}</script>')

	var i;
	function go () {
		volumenotice.innerHTML = "Current Volume: "+player.volume+"/1";
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
	document.write("<center id='Builtradio'><p>The stream is not avalible right now, please try again later.</p></center>")
}