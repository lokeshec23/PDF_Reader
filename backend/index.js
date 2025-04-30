const express = require('express');
const { BlobServiceClient } = require('@azure/storage-blob');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const accessBlob = async (pdfFileName = '') => {
    try {
        console.log('pdfFileName:', pdfFileName);
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME);

        for await (const blob of containerClient.listBlobsFlat()) {
            console.log('Available blob:', blob.name);
        }
        
        const blockBlobClient = containerClient.getBlockBlobClient(pdfFileName);
        const exists = await blockBlobClient.exists();

        if (!exists) {
            throw new Error(`File not found in blob storage: "${pdfFileName}"`);
        }

        console.log('✅ File exists in blob storage.');

        const downloadResponse = await blockBlobClient.download();
        
        if (!downloadResponse || !downloadResponse.readableStreamBody) {
            throw new Error('❌ Failed to get readableStreamBody from the blob download response.');
        }

        // Read the stream and create a buffer
        const chunks = [];
        for await (const chunk of downloadResponse.readableStreamBody) {
            chunks.push(chunk);
        }
        const fileBuffer = Buffer.concat(chunks); // Combine all chunks into a single buffer

        // Return both the file buffer and any metadata you want to send
        return {
            fileBuffer,
            fileName: pdfFileName,
            contentType: 'application/pdf',
            contentLength: fileBuffer.length,
        };
    } catch (error) {
        console.error(`Error in accessBlob:`, error.message);
        throw error;
    }
};

// Enable CORS for all origins (you can customize it if needed)
app.use(cors());

// Endpoint to fetch PDF
app.get('/getpdf', async (req, res) => {
    const { pdfFileName } = req.query;  // Get the PDF file name from the query string
    
    if (!pdfFileName) {
        return res.status(400).send('PDF file name is required');
    }
    
    try {
        const fileData = await accessBlob(pdfFileName);

        // Send the file data and metadata as a JSON response
        res.json({
            fileName: fileData.fileName,
            contentType: fileData.contentType,
            contentLength: fileData.contentLength,
            fileBuffer: fileData.fileBuffer.toString('base64'),  // Convert buffer to base64 to send as JSON
        });
    } catch (error) {
        res.status(500).send(`Error retrieving the file: ${error.message}`);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
