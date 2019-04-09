window.onload = start;
var socket;
var ile = 0;
var napis
var gdzie;
var proba;
var login;
var haslo;
var chaslo;
var czasy = 2;
function start(){
	socket = io.connect();
	register();
	window.addEventListener("resize", function(e){register();});
	write("Grzegorz L.  [Version 10.0.15063] <br /> 2017 ChatRoom. Wszelkie prawa zastrzezone.<br /><br />", "corp");
	setTimeout("nrtwo()", 6000);
}
function register(){
	document.getElementById("res").style.top = document.getElementById("console").offsetTop + document.getElementById("console").offsetHeight + 10 +"px";
	document.getElementById("res").style.left = document.getElementById("console").offsetLeft;
	document.getElementById("res").style.width = document.getElementById("console").offsetWidth;
	
}
function write(nic, nicnr2)
{

	if(nic)napis = nic;
	if(nicnr2)gdzie = nicnr2;
	if(ile<napis.length){
		if(napis[ile] == "<")
		{
			
			var i=0;
			proba = "";
			while(i<1){
				proba +=napis[ile];
				ile++;
				if(napis[ile] == ">"){
					proba +=napis[ile];
					i++;
				}
			}
			
			document.getElementById(gdzie).innerHTML += proba;
		} else
		{document.getElementById(gdzie).innerHTML += napis[ile];}
	ile++;
	setTimeout("write()", 50);
	} else ile=0;
}
function nrtwo(){
	write("Wpisz login: <br />", "wpisz");
	setTimeout("nrtrzy()", 1000);
}
function nrtrzy(){
	document.getElementById("login").innerHTML
	= "<input type=\"text\" id=\"logowanie\" onchange=\"dagi()\" />";
	document.getElementById("logowanie").focus();
}
function dagi(){
	login = document.getElementById("logowanie").value;
	document.getElementById("login").innerHTML = login;
	write("<br />Wpisz hasło: ", "wpisz-haslo");
	setTimeout("funhas()", 1000);
}
function funhas()
{
	document.getElementById("haslo").innerHTML
	= "<input type=\"password\" id=\"haslowanie\" onchange=\"hasok()\" />";
	document.getElementById("haslowanie").focus();
}
function hasok()
{
	haslo = document.getElementById("haslowanie").value;
	document.getElementById("haslo").innerHTML = "";
	for(var i=0; i<haslo.length; i++){
	document.getElementById("haslo").innerHTML += "*";
	}
socket.emit("login", [login, haslo]);
socket.on("getin", function(data){
	if(data=="yes"){
	document.getElementById("loadbar").classList.add("loadbar");
	var date = new Date();
	date.setTime(date.getTime()+30000000);
	document.cookie = "login="+login+"; expires="+date.toGMTString()+"; path=/";
	window.location.href = "/chat.html";
	console.log("zalogowany");
	} else reload();
});
}
function reload(){
	document.getElementById("loadbar").innerHTML
	= "Hasło jest niepoprawne, odświeżenie nastąpi za: <span id=\"time\">"+czasy+"</span>";
	czasy--;
	if(czasy==-1){
		location.reload();
		} else {
			setTimeout("reload()", 1000);
		}
}
