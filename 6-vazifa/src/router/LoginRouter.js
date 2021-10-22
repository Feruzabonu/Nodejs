const router = require("express").Router();

router.get("/", (req,res) =>{
    res.send("Login");
})

module.exports = {
    path: "/login",
    router: router
}

