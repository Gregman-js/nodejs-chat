var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var pamiec;
var users = [];
var connections = [];
var ludzie = [];

server.listen(process.env.PORT || 3000);
console.log("Server działa na 3000 ...")

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.get('/register.html', function(req, res){
	res.sendFile(__dirname + '/register.html');
});
app.get('/chat.html', function(req, res){
	res.sendFile(__dirname + '/chat.html');
});

app.get('/node_modules/socket.io-client/dist/socket.io.js', function(req, res){
	res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});
app.use(express.static("public"));


io.on("connection", function(socket){
connections.push(socket);
console.log("Połączenie: %s user", connections.length);

	socket.on("disconnect", function(data){
		if(!socket.username) return;
		users.splice(users.indexOf(socket.username), 1);
		io.sockets.emit("update users", [users, ludzie]);
		connections.splice(connections.indexOf(socket), 1);
	console.log("Połaczenie zerwane: %s user", connections.length);
	});
	if(fs.existsSync("user.txt")){
	fs.readFile("user.txt", "utf-8", (err, data) => {
				if(err) throw err;
				var mak = data;
				var dwoja = mak.split(" ");
				ludzie = [];
				var nicosc = [];
				for(var i=0; i <dwoja.length;i++){
					var bak = dwoja[i].split("_");
					nicosc.push(bak[0]);
				}
				ludzie = nicosc;
				});
	}
	socket.on("register", function(data){
			pamiec = data[0] + "_" + data[1];
			var login = data[0];
			if(fs.existsSync("user.txt"))
			{
			fs.readFile("user.txt", "utf-8", (err, data) => {
				if(err) throw err;
				if(data.indexOf(login+"_")=="-1"){
				if(data != "")pamiec = data +" "+ pamiec;
				var mak = pamiec;
				var dwoja = mak.split(" ");
				ludzie = [];
				var nicosc = [];
				for(var i=0; i <dwoja.length;i++){
					var bak = dwoja[i].split("_");
					nicosc.push(bak[0]);
				}
				ludzie = nicosc;
				fs.writeFile("user.txt", pamiec, "utf-8", (err) => {
					if(err) throw err;
					io.sockets.emit("gotowe", ":)");
				});
			}
			else{
				io.sockets.emit("istnieje", login);
			}
			});
			}
			else{
				var mak = pamiec;
				var dwoja = mak.split(" ");
				ludzie = [];
				var nicosc = [];
				for(var i=0; i <dwoja.length;i++){
					var bak = dwoja[i].split("_");
					nicosc.push(bak[0]);
				}
				ludzie = nicosc;
				fs.writeFile("user.txt", pamiec, (err) => {
					if(err) throw err;
					io.sockets.emit("gotowe", ":)");
				});
			}
	});
	socket.on("login", function(data){
		var log = data[0];
		var has = data[1];
		fs.readFile("user.txt", "utf-8", (err, data) => {
				if(err) throw err;
				if((data.indexOf(log+"_")!="-1") & (data.indexOf("_"+has)!="-1")){
			console.log("zalogowany");
			io.sockets.emit("getin", "yes");
		}
		else {
			io.sockets.emit("getin", "no");
		}
			});
	});
	socket.on("user", function(data){
		socket.username = data;
		users.push(socket.username);
		console.log(users+"_"+ludzie);
		var mini = [users, ludzie];
		io.sockets.emit("update users", mini);
	});
	socket.on("wiadomość", function(data){
		io.sockets.emit("wysylanie", data);
	});
	//wiadomosc
	socket.on("send message", function(data){
		io.sockets.emit("new message", {msg: data, user: socket.username});
	});

	socket.on("new user", function(data, callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
	});

	function updateUsernames(){
		io.sockets.emit("get users", users);
	}
});
