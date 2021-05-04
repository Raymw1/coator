const express = require("express");
const server = express();

server.use(express.static("public"));

const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server
})


server.listen(3000, function() {
    console.log("Server started")
});

var donors = [
    {
        name: "Ana Luiza",
        size: "P"
    },
    {
        name: "Caio Neves",
        size: "M"
    },
    {
        name: "Laura Beatriz",
        size: "G"
    },
    {
        name: "Eric Zappala",
        size: "GG"
    }
]

server.get("/", function(req, res) {
    return res.render("index.html", { donors })
});
