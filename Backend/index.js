const fastify = require('fastify')({ logger: true });
const multer = require('fastify-multer');
const path = require('path');
const formRoutes = require('./routes/formDataRoutes');

fastify.register(multer.contentParser);
fastify.register(formRoutes);

// Set CORS headers manually
fastify.addHook('onSend', (request, reply, payload, next) => {
  console.log(payload.filename)
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Add the fastify-static plugin to serve the uploaded images
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/', // The prefix URL for accessing the images, e.g., /uploads/image.png
  serve: false, 
});

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log('Server started on http://127.0.0.1:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
