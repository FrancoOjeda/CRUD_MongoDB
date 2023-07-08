const securePass = require("../helpers/securePass.js")
const User = require("../config/schemas/usersSchemas");

async function settingsCtrl ( req, res) {
    try {
        await User.findByIdAndUpdate(req.session.user.id, req.body)

        res.redirect("/perfil")

    } catch (err) {
        res.render("editUserForm", {message: "Ocurrio un error, intente nuevamente"})
        console.log(err.message);
    }
};

module.exports = settingsCtrl;