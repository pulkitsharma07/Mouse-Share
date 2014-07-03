var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 1339;
var host = "127.0.0.1";


app.get("/",function(req,resp){
	resp.sendfile("index.html");
});
var color = {};

io.on("connection",function(socket){

	console.log("Someone connected !!");

	//assign a random color to this socket's cursor.
	color[socket.id]={r:Math.floor((Math.random()*100)%255)+20,g:Math.floor((Math.random()*100)%255)+100,
		b:Math.floor((Math.random()*100)%255)+89};

	socket.on("mousepos",function(coord){
		console.log(socket.id,coord);
		socket.broadcast.emit("all_mouses",{id:socket.id,pos:coord,thiscolor:color[socket.id],isclick:coord.isclick});
	});


});

http.listen(port,host,function(){
console.log("Server listening on "+host+":"+port);	
});

