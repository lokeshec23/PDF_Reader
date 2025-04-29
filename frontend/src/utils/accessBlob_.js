import  { BlobServiceClient } from '@azure/storage-blob';
// require('dotenv').config();
 
const accessBlob = async (pdfFileName = '') => {
    try {
        // console.log('pdfFileName:', pdfFileName);
        // console.log('pdfFileName:', process.env.AZURE_STORAGE_CONNECTION_STRING);
        // console.log('pdfFileName:', process.env.CONTAINER_NAME);
 
        const blobServiceClient = BlobServiceClient.fromConnectionString(import.meta.env.VITE_AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(import.meta.env.VITE_CONTAINER_NAME);
 
        for await (const blob of containerClient.listBlobsFlat()) {
            console.log('Available blob:', blob.name);
        }
 
        const blockBlobClient = containerClient.getBlockBlobClient(pdfFileName);
 
        const exists = await blockBlobClient.exists();
        if (!exists) {
            console.error(`❌ File not found in blob storage: "${pdfFileName}"`);
            return;
        }
 
        console.log('✅ File exists in blob storage.');
 
        const downloadResponse = await blockBlobClient.download();
 
        if (!downloadResponse || !downloadResponse.readableStreamBody) {
            throw new Error('❌ Failed to get readableStreamBody from the blob download response.');
        }
 
        console.log('✅ Blob download stream retrieved successfully.', downloadResponse.readableStreamBody);
 
        return downloadResponse.readableStreamBody;
 
    } catch (error) {
        console.error(`Error in accessBlob:`, error.message);
    }
};
 

 
export default accessBlob