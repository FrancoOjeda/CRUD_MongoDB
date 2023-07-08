const bcrypt = require("bcrypt");
const saltRnd = 10;

const encriptar = async (pass) => {
    return await bcrypt.hash(pass, saltRnd)
};

const desEncriptar = async (pass, hashedPass) => {
    return await bcrypt.compare(pass, hashedPass)
};

module.exports = { encriptar, desEncriptar}