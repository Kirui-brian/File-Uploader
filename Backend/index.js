const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const FormData = require('./models/FormData');

// Configure CORS
fastify.register(require('fastify-cors'), {
    origin: '*',
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Set up routes
fastify.post('/submit-form', async (request, reply) => {
    try {
        const { name, email, phoneNumber } = request.body;
        const file = request.body.file;

        // Save file to storage (update the path as per your needs)
        const filePath = `/uploads/${Date.now()}-${file.filename}`;

        // Save form data to MongoDB
        const formData = new FormData({ name, email, phoneNumber, filePath });
        await formData.save();

        reply.code(200).send({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error submitting form:', error);
        reply.code(500).send({ error: 'Failed to submit form' });
    }
});

fastify.get('/form-data', async (request, reply) => {
    try {
        const formData = await FormData.find();
        reply.code(200).send(formData);
    } catch (error) {
        console.error('Error fetching form data:', error);
        reply.code(500).send({ error: 'Failed to fetch form data' });
    }
});

// Start the server
const start = async () => {
    try {
        await fastify.listen(3000);
        console.log('Server running on port 3000');
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};
start();
