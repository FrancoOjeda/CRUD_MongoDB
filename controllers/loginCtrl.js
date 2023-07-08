const User = require("../config/schemas/usersSchemas.js");
const securePass= require("../helpers/securePass.js");

async function sendLoginForm (req, res) {

    const { email, password } = req.body;

    const user = await User.find().where({ email });

    if( !user.length ){
        res.render("login", { message:"Email o contraseña incorrectos"})
    } else if ( await securePass.desEncriptar( password, user[0].contraseña )) {
            const usr = {
                id: user[0]._id,
                name: user[0].nombre,
                apellido: user[0].apellido,
                email: user[0].email
            }
            req.session.user = usr
            res.render("perfil", {
                user: req.session.user.name,
                id: req.session.user.id
            
            })
    
        } else {
        res.render("login", {message: "Email o contraseña incorrectos"})
        }
};

module.exports = sendLoginForm;