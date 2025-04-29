const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const accessBlob = async (pdfFileName = "") => {
  try {
    const account_name = "caincomecalcstr001";
    const account_key =
      "yRIfHBrTymbvEkU3VyYRfsW/QlGh+eJyH9R70le8vnVP4BXLUa1pFCzwZRHxO+MjDSL6zoGZR0c++ASt3VY/VQ==";
    const container_name = "ic-loandna";

    // # This is usually like https://<account_name>.blob.core.windows.net
    const endpoint = `https://${account_name}.blob.core.windows.net`;

    console.log("pdfFileName:", pdfFileName);
    console.log("pdfFileName:", process.env.AZURE_STORAGE_CONNECTION_STRING);
    console.log("pdfFileName:", process.env.CONTAINER_NAME);

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient(
      process.env.CONTAINER_NAME
    );

    for await (const blob of containerClient.listBlobsFlat()) {
      console.log("Available blob:", blob.name);
      const blobUrl = `${endpoint}/${container_name}/${blob.name}?${account_key}`;
      console.log("Blob URL:", blobUrl);
    }
    //AccountName=caincomecalcstr001;AccountKey=yRIfHBrTymbvEkU3VyYRfsW/QlGh+eJyH9R70le8vnVP4BXLUa1pFCzwZRHxO+MjDSL6zoGZR0c++ASt3VY/VQ==;EndpointSuffix=core.windows.net
    const blockBlobClient = containerClient.getBlockBlobClient(pdfFileName);

    const exists = await blockBlobClient.exists();
    if (!exists) {
      console.error(`❌ File not found in blob storage: "${pdfFileName}"`);
      return;
    }

    console.log("✅ File exists in blob storage.");

    const downloadResponse = await blockBlobClient.download();

    if (!downloadResponse || !downloadResponse.readableStreamBody) {
      throw new Error(
        "❌ Failed to get readableStreamBody from the blob download response."
      );
    }

    console.log("✅ Blob download stream retrieved successfully.");

    console.log({downloadResponse})
    return downloadResponse.readableStreamBody;
  } catch (error) {
    console.error(`Error in accessBlob:`, error.message);
  }
};

  accessBlob("1040.pdf")
// console.log("res:", res);
module.exports = accessBlob;
