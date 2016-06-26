var Streamurl = "";
// The stream's url. ie. http://xxx.xxx.xxx.xxx:0000/ or http://radio.example.com/

var Streamname = "";
// The name of your stream. ie. The best of the 80s! or The top hits!

var Backgroundcolor = "";
// The color for the background, default is white, use hex code. ie. #000000

var Boxshape = true
// Determines if corners are rounded or not, false means rounded, true means sharp.

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\

// Functions, and Callbacks
	// Recommended that you don't touch this, but I'm not gonnna stop ya.

if (Backgroundcolor=="") {
	var Backgroundcolor = "#fff"
}

if (Boxshape==true) {
	var BoxRadius = "0px";
} else if (Boxshape==false) {
	var BoxRadius = "25px";
}

if (Streamurl!=""){
	BuildCss()
	BuildPlayer()
} else if (Streamurl=="") {
	BuildError()
}

function BuildCss () {
	var css = ".Builtradio{border:3px solid #000;border-radius:"+BoxRadius+";width:18%;height:auto;margin:auto;text-align:center;background-color:"+Backgroundcolor+";}.Builtradio audio{margin:2.5%;width:95%;height:auto}";
	var htmlDiv = document.createElement('div');
	htmlDiv.innerHTML = '<p>foo</p><style type="text/css">' + css + '</style>';
	document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[1]);
}

function BuildPlayer () {
	var body = document.write("<div class='Builtradio'><h4>",Streamname,"</h4><audio controls><source src=",Streamurl,"stream.mp3 type='audio/mpeg'><p>You're browser does not support audio streams.</p></audio></div>")
}

function BuildError () {
	document.write("<center id='Builtradio'><p>The stream is not avalible right now, please try again later.</p></center>")
}
