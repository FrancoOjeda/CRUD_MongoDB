const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/controladores.js")
const sendMailContact = require("../controllers/sendMailContact.js")
const sendRegisterForm = require("../controllers/registerCtrl.js")
const sendLoginForm = require("../controllers/loginCtrl.js")
const sendSettings = require("../controllers/settingCtrl.js")

const auth = require("../middleware/authorize.js")

const validacionContact = require("../validators/contactValid.js");
const validacionReg = require("../validators/registerValid.js");
const validacionLog = require("../validators/loginValid");

router.get("/registro", ctrl.getRegister);

router.get("/login", ctrl.getLogin);

router.get("/contacto", ctrl.getContacto);

router.post("/contacto", validacionContact, sendMailContact);

router.post("/registro", validacionReg, sendRegisterForm);

router.post("/login", validacionLog, sendLoginForm);

router.get("/setting", auth, ctrl.getSetting)

router.post("/setting", sendSettings);

router.get("/validacion", auth, (req, res) =>{
    res.send("Aca validamos")
});

router.get("/delete", auth, ctrl.deleteUser);

router.get("/logout", ctrl.logout);

module.exports = router;