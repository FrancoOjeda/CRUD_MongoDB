const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, trim: true, unique: true, sparse: true},
    contraseña: {type: String, required: true},
},
{timestamps: true}
);

const User = model("User", userSchema)

module.exports = User