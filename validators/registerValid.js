const { body, validationResult } = require("express-validator");

// definimos las reglas de validacion para el registro
const validationRegister = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio").isLength({min:2, max:30}).withMessage("Debe contener entre 2 y 30 caracteres"),
    body("email")
        .notEmpty().withMessage("El email es  Obligatorio").isEmail().withMessage("Debe ingresar un Email válido"),
    body("password")
        .notEmpty().withMessage("La contraseña es  obligatoria").isAlphanumeric().withMessage("Solo se permiten letras y numeros como contraseña"),

    (req, res, next) => {
        const error = validationResult(req)

        if (!error.isEmpty()){
            const formDataReg = req.body
            
            const arrRegWarming = error.array()
            res.render("register", { arrRegWarming, formDataReg })
        } else return next();
    }
]

module.exports = validationRegister;