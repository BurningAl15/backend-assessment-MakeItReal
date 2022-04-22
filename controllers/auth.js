const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require('../models/user');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Check if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User/Password are not correct'
            });
        }

        // Check if user is active
        if (user.state === false) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado:false'
            })
        }


        // Check if password is valid
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password'
            })
        }

        // Generate the JWT
        const token = await generateJWT(user.id);

        res.json({
            // user,
            token,
            msg: 'Successfully Logged in!'
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Check with the admin'
        });
    }
}

const register = async (req, res = response) => {
    const { email, password } = req.body;
    const user = new User({ email, password });

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Save in BD
    await user.save();

    res.json({
        // user
        msg: "Congrats, your user is successfully created!"
    });
}

module.exports = { login, register };
