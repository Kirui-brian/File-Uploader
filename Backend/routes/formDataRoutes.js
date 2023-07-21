const fastify = require('fastify');
const multer = require('fastify-multer');
const formDataController = require('../controllers/formDataController');

const upload = multer({ dest: 'uploads/' });

function formRoutes(fastify, options, done) {
    fastify.get('/form-data', async (request, reply) => {
        try {
            const formDataList = await formDataController.getAllFormData();
            reply.send(formDataList);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/submit-form', { preHandler: upload.single('file') }, async (request, reply) => {
        try {
            const formData = request.body;
            const file = request.file;

            if (!formData.name || !formData.email || !formData.phoneNumber || !file) {
                return reply.status(400).send({ error: 'Invalid form data or file missing' });
            }

            const filePath = await formDataController.saveFormData(formData, file);
            reply.send({ success: true, filePath: filePath });
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    done();
}

module.exports = formRoutes;
