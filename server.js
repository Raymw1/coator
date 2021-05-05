const express = require("express"); // 1
const server = express();   // 2

server.use(express.static("public"));   // 6

const nunjucks = require("nunjucks");   // 5
nunjucks.configure("./", {
    express: server,
    noCache: true   // Don't update too many times
})

server.use(express.urlencoded({ extended: true })); // 7

const Pool = require("pg").Pool;    // 8
const db = new Pool({   // Configure database
    user: "raymw",
    password: "0000",
    host: "localhost",
    port: 5432,
    database: "coator"
})

server.listen(3000, function() {
    console.log("Server started");   // 3
});

var donors = [];

server.get("/", function(req, res) {    // 4
    db.query("SELECT * FROM donors", function(err, result) {
        if (err) return res.send("Database error!");
        donors = [
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
        ];
        let results = result.rows;
        for (const row of results) {
            donors.push({
                name: row.name,
                email: row.email,
                size: row.size
            });
        }
        return res.render("index.html", { donors });
    });
});

server.post("/", function(req, res) {   // 7
    const name = req.body.name;
    const email = req.body.email;
    let size = req.body.size;
    size = size.toUpperCase();
    // donors.unshift({
    //     name: name,
    //     email: email,
    //     size: size
    // })
    if (name == "" || email == "" || size == "") {
        return res.send("You forgot to insert something!");
    }
    const sizes = ["PP", "P", "M", "G", "GG", "EG", "EGG", "XS", "S", "L", "XL", "XXL", "XXXL"];
    let sizeCorrect = false;
    for (let sizen of sizes) {
        if (size == sizen) {
            sizeCorrect = true;
            break;
        }
    }
    if (!sizeCorrect) {
        return res.send("Please, put an existing size!");
    }
    const query = 'INSERT INTO donors ("name", "email", "size") VALUES ($1, $2, $3)';
    const values = [name, email, size];
    db.query(query, values, function(err) {
        if (err) return res.send("Something went wrong;")
        return res.redirect("/");
    });
})
