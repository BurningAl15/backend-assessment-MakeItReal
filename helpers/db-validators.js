const User = require('../models/user');
const Fav = require('../models/fav');

const isEmailAvailable = async (email = '') => {

    // Verificar si el correo existe
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`Email: ${email}, is already registered`);
    }
}

const userExistsById = async (id) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`Id ${id} didn't exist`);
    }
}

const favExistsById = async (id) => {
    const userExists = await Fav.findById(id);
    if (!userExists) {
        throw new Error(`Id ${id} didn't exist`);
    }
}

module.exports = {
    isEmailAvailable,
    userExistsById,
    favExistsById
}

