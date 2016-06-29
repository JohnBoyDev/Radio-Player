// John Channell | The following is an example of what you can listen to, edit as you please.

var Streamurl1 = "http://wqen-fm.akacast.akamaistream.net/7/895/31814/v1/auth.akacast.akamaistream.net/wqen-fm.mp3";
var Streamurl2 = "http://wmjj-hd2.akacast.akamaistream.net/7/661/129338/v1/auth.akacast.akamaistream.net/wmjj-hd2";
var Streamurl3 = "http://wdxb-fm.akacast.akamaistream.net/7/337/31813/v1/auth.akacast.akamaistream.net/wdxb-fm";
// The stream's url. ie. http://xxx.xxx.xxx.xxx:0000/ or http://radio.example.com:0000/

var Streamname1 = "103.7 The Q";
var Streamname2 = "104.1 The Beat";
var Streamname3 = "102.5 The Bull";
// The name of your stream. ie. The best of the 80s! or The top hits!

var Backgroundcolor1 = "#F42330";
var Backgroundcolor2 = "#256DA1";
var Backgroundcolor3 = "#DFCC8F";
// The color for the background, default is white, use hex code. ie. #000000

var Boxshape = true;
// Determines if corners are rounded or not, false means rounded, true means sharp.

var BigPlayer = false;
// true means big player, for mobile pages, and false is a more compact size for desktops.

var RadioHelpLocation = "radiohelp.html";

var Version = "2";
// Set by the developer, when ever you decide to make a change, add 0.1 to the version.










// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\

// Functions, and Callbacks
	// Recommended that you don't touch this, but I'm not gonnna stop ya.

if (Backgroundcolor1=="") {
	var Backgroundcolor1 = "#fff"
} else if (Backgroundcolor2=="") {
	var Backgroundcolor2 = "#fff"
} else if (Backgroundcolor3=="") {
	var Backgroundcolor3 = "#fff"
}

if (Boxshape==true) {
	var BoxRadius = "0px";
} else if (Boxshape==false) {
	var BoxRadius = "17.5px";
}

if (BigPlayer==false) {
	var btnsize="auto";
	var plrwidth="27.5%";
} else if (BigPlayer==true) {
	var btnsize="100px";
	var plrwidth="40%";
}

BuildCss()
BuildPlayer()

function BuildCss () {
	var css = ".Builtradio{border:3px solid #000;border-radius:"+BoxRadius+";width:"+plrwidth+";height:auto;margin:auto;text-align:center;background-color:"+Backgroundcolor1+";font-size:1.25em;}.Builtradio audio{margin:2.5%;width:95%;height:auto;display:none;}.Builtradio hr{width:95%;}.Builtradio button{width:30%;height:"+btnsize+";margin-right:5px;margin-bottom:5px;display:inline-block;padding:0px;background-color:#000;border:2px solid silver;font-weight:700;height:auto;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;cursor:pointer;margin:4px 2px;}.Builtradio h2{text-shadow: 0px 2px 15px #ffffff;}";
	var htmlDiv = document.createElement('div');
	htmlDiv.innerHTML = '<p>foo</p><style type="text/css">' + css + '</style>';
	document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[1]);
}

function BuildPlayer () {
	var body = document.write("<div class='Builtradio' id='Player'><button onclick='strm1()' class='button' type='button'>Stream 1</button><button onclick='strm2()' class='button' type='button'>Stream 2</button><button onclick='strm3()' class='button' type='button'>Stream 3</button><h2 id='Title'>",Streamname1,"</h2><audio controls id='Builtradio' autoplay ><source src=",Streamurl1," type='audio/mpeg' volume='10'><p>You're browser does not support audio streams.</p></audio><p id='Volume'>Current Volume:</p>")
	var player = document.getElementById("Builtradio");
	player.volume = 0.2
	var volumenotice = document.getElementById("Volume");
	document.write("<button onclick='up()' class='button' type='button'>Volume Up</button><button onclick='down()' class='button' type='button'>Volume Down</button><button onclick='mute()' class='button' type='button'>Volume Mute</button><button onclick='openhelp()' class='button' type='button'>Help</button><hr noshade><p>Version "+Version+"</p></div>")
	document.write('<script type="text/javascript">var bgcolor=document.getElementById("Player"); var player=document.getElementById("Builtradio"); var title=document.getElementById("Title"); function up() {player.volume=player.volume+0.1;} function down() {player.volume=player.volume-0.1;} function mute() {player.volume=0;}function openhelp() {window.open("'+RadioHelpLocation+'", "myWindow", "width=700,height=300");}function strm1() {player.src="'+Streamurl1+'";title.innerHTML="'+Streamname1+'";bgcolor.style.backgroundColor="'+Backgroundcolor1+'";}function strm2() {player.src="'+Streamurl2+'";title.innerHTML="'+Streamname2+'";bgcolor.style.backgroundColor="'+Backgroundcolor2+'";}function strm3() {player.src="'+Streamurl3+'";title.innerHTML="'+Streamname3+'";bgcolor.style.backgroundColor="'+Backgroundcolor3+'";}</script>')
	var i;
	function go () {
		volumenotice.innerHTML = "Current Volume: "+player.volume;
		i++;
		setTimeout(go,1);
	}
	go();
}

function BuildError () {
	document.write("<center id='Builtradio'><p>The stream is not avalible right now, please try again later.</p></center>")
}
