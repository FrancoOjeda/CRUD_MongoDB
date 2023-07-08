const User = require("../config/schemas/usersSchemas.js");
const securePass= require("../helpers/securePass.js")

async function sendRegisterForm ( req, res) {
    const { nombre, apellido, email, password } = req.body
    const contraseña = await securePass.encriptar(password)
    

    const newUser = new User({
        nombre,
        apellido,
        email,
        contraseña
    });
    

    newUser.save((err) => {
        if(!err){
            req.session.user = `${nombre} ${apellido}`
            res.render("perfil", {user: req.session.user })
        } else {
            res.render("register", { message: "Ya existe un registro con ese email" })
            console.log(err.message);
        }
    })
};

module.exports = sendRegisterForm;