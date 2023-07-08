require("./config/mongo.js")
const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const app = express();
const PORT = 3000;

const auth = require("./middleware/authorize.js")

const router = require("./rutas/usersRoutes.js")

app.listen(PORT, err=>{
    !err ? console.log(`Server running on http://localhost:${PORT}`) : console.log(err.message);
})

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.locals.sendMailFeedBack

app.get("/", (req, res) =>{
    res.render("home", { user: req.session.user})
});

app.get("/perfil", auth, (req, res) => {
    res.render("perfil", { user: req.session.user.name})
})

app.get("/noAuth", (req, res) => {
    res.render("noPasa")
});

app.use("/users", router);

app.get("*", (req, res)=>{
    res.render("notFound")
});