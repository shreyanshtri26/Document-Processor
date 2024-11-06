const { extractInfo } = require('../utils/extractInfo');

exports.extractDocumentInfo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const result = await extractInfo(req.file.path);
        res.json(result);
    } catch (error) {
        console.error('Error processing document:', error);
        res.status(500).json({ error: error.message });
    }
};