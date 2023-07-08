const { assign } = require("nodemailer/lib/shared/index.js");
const User = require("../config/schemas/usersSchemas.js");

function getRegister (req, res) {
    res.render("register")
};

function getLogin(req, res) {
    res.render("login")
};

function getContacto(req, res) {
    res.render("contacto");
};

function logout (req, res){
    req.session.destroy();
    res.redirect("/")
};

async function getSetting (req, res) {
    const user = User.findById(req.session.user.id).lean()

    res.render("editUserForm", { user: req.session.user })
};

async function deleteUser (req, res) {
    try {
        await User.findByIdAndDelete(req.session.user.id)
        req.session.destroy()
        res.redirect("/")
    } catch (error) {
        res.render("editUserForm", {messge: "Ha ocurrido un error, intente nuevamente"})   
    }
};

module.exports= {
    getRegister,
    getLogin,
    getContacto,
    getSetting,
    logout,
    deleteUser
};