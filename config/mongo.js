require("dotenv").config();

const mongoose = require("mongoose");

const URI = process.env.DB_URI

mongoose.connect(URI, (err => {
    err? console.log("Pasaron cosas") : console.log("TODO CONECTADO, REY");
}))