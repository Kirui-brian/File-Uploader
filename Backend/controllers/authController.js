const User = require('../models/User')

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if the user entered the name
        if (!name) {
            return res.json({ 
                error: 'Name is required' 
        });
        };
        // Check is the password is good
        if (!password || !password.length < 6) {
            return res.json({ 
                error: 'Password is required and it should be at least 6 characters long.' 
            });
        };
        // Check email
        const exist = await UserActivation.findOne({ email }); 
        if (exist) {
            return res.json({ 
                error: 'Email is taken!' 
            });
        }
        const user = await User.create({ 
            name, email, password 
        });

        return res.json(user);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = signup;