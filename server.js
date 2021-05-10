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

const PORT = process.env.PORT||"3000"

server.listen(PORT, function() {
    console.log("Go to: http://127.0.0.1:3000/");   // 3
});

var donors = [];
var sizes = ["PP", "P", "M", "G", "GG", "EG", "EGG", "XS", "S", "L", "XL", "XXL", "XXXL"];

server.get("/", function(req, res) {    // 4
    db.query("SELECT * FROM donors", function(err, result) {
        const message = "Erro na base de dados";
        if (err) return res.render("public/apology.html", { message });
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
        return res.render("index.html", { donors, sizes });
    });
});

server.post("/", function(req, res) {   // 7
    const name = req.body.name;
    const email = req.body.email;
    let size = req.body.size;
    // donors.unshift({
        //     name: name,
        //     email: email,
        //     size: size
        // })
    if (name == "" || email == "" || size == "" || !size) {
        const message = "Você esqueceu de colocar algo!";
        return res.render("public/apology.html", { message });
    }
    size = size.toUpperCase();
    let sizeCorrect = false;
    for (let sizen of sizes) {
        if (size == sizen) {
            sizeCorrect = true;
            break;
        }
    }
    if (!sizeCorrect) {
        const message = "Por favor, coloque um tamanho válido!";
        return res.render("public/apology.html", { message });
    }
    const query = 'INSERT INTO donors ("name", "email", "size") VALUES ($1, $2, $3)';
    const values = [name, email, size];
    db.query(query, values, function(err) {
        if (err) return res.render("public/apology.html");
        return res.redirect("/");
    });
})
