const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const {PORT} = require("../config");
const LoginRoute = require("../routes/LoginRoute")

server.listen(PORT, ()=>console.log(`SERVER READY AT PORT ${PORT}`));
server.use(express.json);
server.use(express.urlencoded({extended:true}));
server.use(cookieParser()); 
server.use(express.static(path.join(__dirname, "public")));

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use(LoginRoute.path, LoginRoute.router)

