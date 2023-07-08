const transport = require("../config/nodemailer.js")


async function sendMailContact (req, res){

    const { nombre, apellido, email, motivo, mensaje } = req.body

    const emailMsg = {
        to: email,
        from: email,
        subject: motivo,
        html: `Contacto de ${nombre} ${apellido}: ${mensaje}`
    }

    const sendMailStatus = await transport.sendMail(emailMsg)

    if(sendMailStatus.rejected.length){
        req.app.locals.sendMailFeedBack = "No se puedo enviar"
    } else {
        req.app.locals.sendMailFeedBack = "Mensaje enviado"
        const enviado = true
    }

    res.redirect("/")
};

module.exports = sendMailContact;