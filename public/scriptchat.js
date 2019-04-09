window.onload = start;
var socket;
var login;
var mes;
var chat = [];
var write = {
	where: [],
	text: [],
}
//var nieodeb = [];
function start(){
	socket = io.connect();
	if(document.cookie !=""){
		var ciacho = document.cookie.split("; ");
	var podz = ciacho[0].split("=");
	login = podz[1];
	socket.emit("user", login);
	socket.on("update users", function(data){
		document.getElementById("gracze").innerHTML = "";
		for(var i =0; i<data[1].length;i++){
			var poprawne = false;
			for(var m=0; m<data[0].length;m++){
				if(data[1][i].indexOf(data[0][m])!="-1")poprawne = true;
			}
				if(poprawne==true){
				document.getElementById("gracze").innerHTML += "<li onclick=\"chatowanie('"+data[1][i]+"')\" id=\"nowewiad"+data[1][i]+"\" class=\"zalog pisz\">"+data[1][i]+"</li>";
				} else{
				document.getElementById("gracze").innerHTML += "<li onclick=\"chatowanie('"+data[1][i]+"')\" id=\"nowewiad"+data[1][i]+"\" class=\"pisz\">"+data[1][i]+"</li>";	
				
		}
		}
	});
	socket.on("wysylanie", function(data){
		//zapis rozmowy
		if(data[0]==login){
			if(write.where.indexOf(data[2]) != "-1"){
				var pozycja = write.where.indexOf(data[2]);
				write.text[pozycja].who.push(data[0]);
				write.text[pozycja].info.push(data[1]);
			} else {
				write.where.push(data[2]);
				var pozycja = write.where.indexOf(data[2]);
				write.text.push("nicoscjestqwerty");
				var odl = write.text.indexOf("nicoscjestqwerty");
				write.text[odl] = {
					who: [],
					info: [],
				};
				write.text[odl].who.push(data[0]);
				write.text[odl].info.push(data[1]);
			}
		} else if(data[2] == login){
			if(write.where.indexOf(data[0]) != "-1"){
				var pozycja = write.where.indexOf(data[0]);
				write.text[pozycja].who.push(data[0]);
				write.text[pozycja].info.push(data[1]);
			} else {
				write.where.push(data[0]);
				var pozycja = write.where.indexOf(data[0]);
				write.text.push("nicoscjestqwerty");
				var odl = write.text.indexOf("nicoscjestqwerty");
				write.text[odl] = {
					who: [],
					info: [],
				};
				write.text[odl].who.push(data[0]);
				write.text[odl].info.push(data[1]);
			}
		} else if(data[2] == "every"){
			if(write.where.indexOf(data[2]) != "-1"){
				var pozycja = write.where.indexOf(data[2]);
				write.text[pozycja].who.push(data[0]);
				write.text[pozycja].info.push(data[1]);
			} else {
				write.where.push(data[2]);
				var pozycja = write.where.indexOf(data[2]);
				write.text.push("nicoscjestqwerty");
				var odl = write.text.indexOf("nicoscjestqwerty");
				write.text[odl] = {
					who: [],
					info: [],
				};
				write.text[odl].who.push(data[0]);
				write.text[odl].info.push(data[1]);
			}
		}
		
		//koniec zapisu
	if(data[2]=="every"){
			if(data[0]==login){
			document.getElementById(data[2]).innerHTML +=
			"<li><div style=\"width: 100%; text-align: right;\"><div class=\"message-i-user\">"+"Ja"+":</div><div class=\"message-i-text\"><b>"+data[1]+"</b></div></div></li>";
			} else {
			if((screen.width > 800) || (chat=="")){
				document.getElementById(data[2]).innerHTML +=
			"<li><div style=\"width: 100%; text-align: left;\"><div class=\"message-user\">"+data[0]+":</div><div class=\"message-text\"><b>"+data[1]+"</b></div></div></li>";
			}
			}
	} else if(data[2]==login) {
		if(chat.indexOf(data[0]) > -1){
			document.getElementById(data[0]).innerHTML +=
			"<li><div style=\"width: 100%; text-align: left;\"><div class=\"message-user\">"+data[0]+":</div><div class=\"message-text\"><b>"+data[1]+"</b></div></div></li>";
		} else {
			if(screen.width < 800){
		if(document.getElementById("kolo"+data[0])){
			var ile = document.getElementById("kolo"+data[0]).getElementsByClassName("wydajcent")[0].innerHTML;
			document.getElementById("kolo"+data[0]).parentNode.removeChild(document.getElementById("kolo"+data[0]));
		document.getElementById("nowewiad"+data[0]).innerHTML += "<div id=\"kolo"+data[0]+"\" class=\"wydaj\"><div class=\"wydajcent\">"+(parseInt(ile)+1)+"</div></div>";
		} else {
			document.getElementById("nowewiad"+data[0]).innerHTML += "<div id=\"kolo"+data[0]+"\" class=\"wydaj\"><div class=\"wydajcent\">1</div></div>";
			document.getElementById("menu").innerHTML += "<div id=\"look-it\"><div id=\"look-it-small\">!</div></div>";
		}
	}
	if(screen.width > 800){
			chat.push(data[0]);
	document.getElementById("wiadomosc").innerHTML += "<div class=\"inner-mes\"><div class=\"mes-top-bar\"><img src=\"android.png\" alt=\"...\"><div class=\"chat-name\">"+data[0]+"</div><div class=\"remote-asist\" onclick=\"delate(this)\"></div></div><ul id=\""+data[0]+"\" class=\"wiadomosc-gracz\"></ul><div class=\"input-area\"><input id=\"in"+data[0]+"\" type=\"text\" class=\"write-input\" placeholder=\"Wiadomość:\" onfocus=\"this.placeholder=''\" onblur=\"this.placeholder='Wiadomość:'\" onKeyPress=\"return checkSubmit(event, this)\" /></div></div>";
				if(write.where.indexOf(data[0]) != -1){
		var pos = write.where.indexOf(data[0]);
		for(var i = 0; i < write.text[pos].who.length; i++){
			if( write.text[pos].who[i] == login){
				document.getElementById(data[0]).innerHTML +=
			"<li><div style=\"width: 100%; text-align: right;\"><div class=\"message-i-user\">"+"Ja"+":</div><div class=\"message-i-text\"><b>"+write.text[pos].info[i]+"</b></div></div></li>";
			} else {
				document.getElementById(data[0]).innerHTML +=
			"<li><div style=\"width: 100%; text-align: left;\"><div class=\"message-user\">"+write.text[pos].who[i]+":</div><div class=\"message-text\"><b>"+write.text[pos].info[i]+"</b></div></div></li>";
			}
		}
	}
		}
	}
	} else if(data[0]==login) {
		document.getElementById(data[2]).innerHTML +=
			"<li><div style=\"width: 100%; text-align: right;\"><div class=\"message-i-user\">"+"Ja"+":</div><div class=\"message-i-text\"><b>"+data[1]+"</b></div></div></li>";
	}
		
		var dotek = document.getElementsByTagName("li");
		dotek[(dotek.length - 1)].scrollIntoView(true);
	});
	
	} else window.location.href = "/";
}
function checkSubmit(e, jako){
	if(e && e.keyCode == 13){
		send(jako);
	}
}
function send(jako){
	var ident = jako.id;
	mes = document.getElementById(ident).value;
	document.getElementById(ident).value = "";
	ident = ident.substr(2);
	if(mes != "")socket.emit("wiadomość", [login, mes, ident]);
}
function logout(){
	var data = new Date();
	data.setTime(data.getMonth()-1);
	document.cookie = "login=; expires="+ data.toGMTString();
	window.location.href = "/";
}
function chatowanie(gosc)
{
if(gosc != login){
	if(chat.indexOf(gosc) == -1){
	if(screen.width < 800){
		document.getElementById("wiadomosc")
		.removeChild(document.getElementsByClassName("inner-mes")[0]);
		chat = [];
	}
	chat.push(gosc);
	document.getElementById("wiadomosc").innerHTML += "<div class=\"inner-mes\"><div class=\"mes-top-bar\"><img src=\"android.png\" alt=\"...\"><div class=\"chat-name\">"+gosc+"</div><div class=\"remote-asist\" onclick=\"delate(this)\"></div></div><ul id=\""+gosc+"\" class=\"wiadomosc-gracz\"></ul><div class=\"input-area\"><input id=\"in"+gosc+"\" type=\"text\" class=\"write-input\" placeholder=\"Wiadomość:\" onfocus=\"this.placeholder=''\" onblur=\"this.placeholder='Wiadomość:'\" onKeyPress=\"return checkSubmit(event, this)\" /></div></div>";
	if(write.where.indexOf(gosc) != -1){
		var pos = write.where.indexOf(gosc);
		for(var i = 0; i < write.text[pos].who.length; i++){
			if( write.text[pos].who[i] == login){
				document.getElementById(gosc).innerHTML +=
			"<li><div style=\"width: 100%; text-align: right;\"><div class=\"message-i-user\">"+"Ja"+":</div><div class=\"message-i-text\"><b>"+write.text[pos].info[i]+"</b></div></div></li>";
			} else {
				document.getElementById(gosc).innerHTML +=
			"<li><div style=\"width: 100%; text-align: left;\"><div class=\"message-user\">"+write.text[pos].who[i]+":</div><div class=\"message-text\"><b>"+write.text[pos].info[i]+"</b></div></div></li>";
			}
		}
	}
	if(document.getElementsByClassName("wydaj").length > 0){
		document.getElementById("menu").removeChild(document.getElementById("look-it"));
	}
	if(document.getElementById("kolo"+gosc)){
		document.getElementById("kolo"+gosc).parentNode.removeChild(document.getElementById("kolo"+gosc));
	}
	}
}
}
function delate(cialo){
	var index = chat.indexOf(cialo.parentNode.getElementsByClassName("chat-name")[0].innerHTML);
	chat.splice(index, 1);
	cialo.parentNode.parentNode.parentNode.removeChild(cialo.parentNode.parentNode);
	if(screen.width < 800){
		document.getElementById("wiadomosc").innerHTML += "<div class=\"inner-mes\"><div class=\"mes-top-bar\"><img src=\"android.png\" alt=\"...\"><div class=\"chat-name\">Wszyscy</div></div><ul id=\"every\" class=\"wiadomosc-gracz\"></ul><div class=\"input-area\"><input id=\"inevery\" type=\"text\" class=\"write-input\" placeholder=\"Wiadomość:\" onfocus=\"this.placeholder=''\" onblur=\"this.placeholder='Wiadomość:'\" onKeyPress=\"return checkSubmit(event, this)\" /></div></div>";
		chat = [];
		if(write.where.indexOf("every") != -1){
		var pos = write.where.indexOf("every");
		for(var i = 0; i < write.text[pos].who.length; i++){
			if( write.text[pos].who[i] == login){
				document.getElementById("every").innerHTML +=
			"<li><div style=\"width: 100%; text-align: right;\"><div class=\"message-i-user\">"+"Ja"+":</div><div class=\"message-i-text\"><b>"+write.text[pos].info[i]+"</b></div></div></li>";
			} else {
				document.getElementById("every").innerHTML +=
			"<li><div style=\"width: 100%; text-align: left;\"><div class=\"message-user\">"+write.text[pos].who[i]+":</div><div class=\"message-text\"><b>"+write.text[pos].info[i]+"</b></div></div></li>";
			}
		}
	}
	}
}