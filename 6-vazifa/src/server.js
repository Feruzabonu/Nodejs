const express = require("express");
const path = require("path");
const fs = require("fs");
const CookieParser = require("cookie-parser");
const {PORT} = require("../config");
const server = express();
const LoginRoute = require("./router/LoginRouter");
const { fstat } = require("fs");


server.listen(PORT, (_) => console.log(`SERVER READY AT PORT ${PORT}`));

server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(CookieParser());
server.use(express.static(path.join(__dirname, "public")));

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));


fs.readdir(path.join(__dirname, "router"), (err, files) =>{
    files.forEach((file) =>{
        let routePath = path.join(__dirname, "router", file);
        let Route = require(routePath);
        if(Route.path&&Route.router) server.use(Route.path, Route.router);
    })
})