// The url library allows us to parse parts of the request url.
var express = require("express");
var url = require("url");
var http = require("http");
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path")
var app = express();
var PORT = 8080;

// var server = http.createServer(handleRequest);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// // Lets start our server
// server.listen(PORT, function() {
// 	console.log("Server listening on: http://localhost:%s", PORT);
// });

// variables for reservation info
// variable for all who make reservation
var allUsers = [{
	guestName: "",
	guestNumber: "",
	guestEmail: "",
	guestId: ""
}];
// top 5 reservations
var currentList = [{
	guestName: "",
	guestNumber: "",
	guestEmail: "",
	guestId: ""
}];
// Rest of users minus the top 5
var waitList = [{
	guestName: "",
	guestNumber: "",
	guestEmail: "",
	guestId: ""
}];

// routes
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

// getting user info from submit button on res page
app.post("/reserve", function(req, res) {
	var newUser = req.body

	console.log("is this really a new users?", newUser)


	allUsers.push(newUser);
	res.json(newUser);
	if (allUsers.length < 4) {
		currentList.push(newUser);
		return res.send();
	} else {
		waitList.push(newUser);
	}
});

// 
app.get("/api/tables", function(req, res) {
	for (var i = 0; i < allUsers.length; i++) {
		if (allUsers.length < 4) {
			res.json(allUsers);
		}
	}
});
 
// add the listener
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});
