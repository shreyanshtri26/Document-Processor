// server/src/utils/extractInfo.js
const Tesseract = require('tesseract.js');

exports.extractInfo = async (imagePath) => {
    try {
        // Perform OCR with improved settings
        const { data: { text } } = await Tesseract.recognize(
            imagePath,
            'eng',
            {
                logger: m => console.log(m),
                // Add tesseract configuration for better accuracy
                tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/.',
                tessedit_pageseg_mode: '1'
            }
        );

        console.log('Extracted Text:', text); // For debugging

        // Enhanced regular expressions for better matching
        const patterns = {
            // Name patterns
            name: [
                /Name:?\s*([A-Za-z\s.-]+)/i,
                /Full Name:?\s*([A-Za-z\s.-]+)/i,
                /([A-Za-z\s.-]+)\s*DOB:/i,
                /([A-Za-z\s.-]+)\s*Date of Birth/i
            ],
            
            // Document number patterns
            documentNumber: [
                /Document\s*#?\s*[:.]?\s*([A-Z0-9-]+)/i,
                /License\s*#?\s*[:.]?\s*([A-Z0-9-]+)/i,
                /Passport\s*#?\s*[:.]?\s*([A-Z0-9-]+)/i,
                /No\.?\s*[:.]?\s*([A-Z0-9-]+)/i,
                /Number\s*[:.]?\s*([A-Z0-9-]+)/i,
                /ID\s*[:.]?\s*([A-Z0-9-]+)/i
            ],
            
            // Expiration date patterns
            expirationDate: [
                /Expiration\s*Date\s*[:.]?\s*(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
                /Expires?\s*[:.]?\s*(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
                /Valid\s*Until\s*[:.]?\s*(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
                /Exp\.?\s*[:.]?\s*(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
                /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s*EXP/i
            ]
        };

        // Function to try multiple patterns
        const findMatch = (patterns) => {
            for (let pattern of patterns) {
                const match = text.match(pattern);
                if (match && match[1]) {
                    return match[1].trim();
                }
            }
            return null;
        };

        // Extract information using multiple patterns
        const name = findMatch(patterns.name);
        const documentNumber = findMatch(patterns.documentNumber);
        const expirationDate = findMatch(patterns.expirationDate);

        // Clean and format the results
        const cleanResult = {
            name: name ? name.replace(/[^A-Za-z\s.-]/g, '').trim() : null,
            documentNumber: documentNumber ? documentNumber.replace(/[^A-Z0-9-]/gi, '').trim() : null,
            expirationDate: expirationDate ? expirationDate.trim() : null,
            rawText: text // Include raw text for debugging
        };

        console.log('Cleaned Result:', cleanResult); // For debugging

        return cleanResult;
    } catch (error) {
        console.error('Error in extractInfo:', error);
        throw new Error('Error processing document: ' + error.message);
    }
};