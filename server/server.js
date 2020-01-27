const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
// const jwt = require('jsonwebtoken')
// var cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router({
  menu: require("./db/menu.json"),
  userlist: require("./db/userlist.json"),
  adduser: require("./db/userlist.json")
});

server.use(jsonServer.defaults());
//server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json());

server.use(router);

server.listen(7000, () => {
  console.log("The API server is running At http://localhost:7000");
});
