// import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

// export async function getPdfFromAzure({ accountName, accountKey, containerName, blobName }) {
//   const blobEndpoint = `https://${accountName}.blob.core.windows.net`;
//   const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
//   const blobServiceClient = new BlobServiceClient(blobEndpoint, sharedKeyCredential);

//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   const blobClient = containerClient.getBlobClient(blobName);

//   const downloadResponse = await blobClient.download();
//   const blob = await downloadResponse.blobBody;
//   const arrayBuffer = await blob.arrayBuffer();
//   return arrayBuffer;
// }
