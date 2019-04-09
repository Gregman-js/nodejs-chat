var socket;
var login;
var haslo;
var hasload;
function send(){
	socket = io.connect();
	login = document.getElementById("login").value;
	haslo = document.getElementById("pasy").value;
	hasload = document.getElementById("pasyad").value;
	socket.emit("register", [login, haslo, hasload]);
	socket.on("zlehas", function(data){
		document.getElementById("popraw").innerHTML = "Hasło administratora jest niepoprawne";
	});
	socket.on("istnieje", function(data){
		document.getElementById("popraw").innerHTML = "Login: "+ data+ " już istnieje, zmień login";
	});
	socket.on("gotowe", function(data){
		document.getElementById("popraw").innerHTML = "Dziękuje";
		setTimeout("back()", 500);
	});
}
function back(){
	window.location.href = "/";
}
