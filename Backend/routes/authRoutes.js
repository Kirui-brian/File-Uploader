const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authController = require('../controllers/authController')

// Signup route
function authRoutes(fastify, options, done) {
    fastify.post('/signup', async (request, reply) => {
        try {
            const { name, email, password } = request.body;

            // Check if user with same email already exists
            const existingUser = await User.authController.findOne({ email });
            if (existingUser) {
                return reply.code(400).send({ error: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();

            // Create and send JWT token for authentication
            const token = jwt.sign({ userId: newUser._id}, 'Kirui-secret', {
                expiresIn: '1h',
            });

            reply.code(201).send({ token });
        
        } catch (error) {
            console.error(error);
            reply.code(500).send({ error: 'Server error' });    
        }
    });

    // Login route
    fastify.post('/login', async (request, reply) => {
        try {
            const { email, password } = request.body;

            // Check if the user with email exists
            const user = await User.authController.findOne({ email });
            if (!user) {
                return reply.code(401).send({ error: 'Invalid email!' });
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return reply.code(401).send({ error: 'Invalid password!' });
            }

            // Create and send JWT token for authentication
            const token = jwt.sign({ userId: user._id }, 'Kirui-secret', {
                expiresIn: '1h',
            });

            reply.send({ token });
        } catch (error) {
            console.error(error);
            reply.code(500).send({ error: 'Server error' });
        }
    });

    done();
}

module.exports = authRoutes;