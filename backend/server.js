// npm install @azure/storage-blob express dotenv cors
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions
} from "@azure/storage-blob";

dotenv.config();
const app = express();
// Allow CORS from specific origin (e.g., your frontend)
app.use(cors({
    origin: "http://localhost:5173" // ← Replace with your frontend URL
  }));
app.use(cors());


const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const containerName = process.env.AZURE_CONTAINER_NAME;

app.get("/get-pdf-url", async (req, res) => {
  try{
    const blobName = req.query.blobName;

    if (!blobName) return res.status(400).send("Missing blobName");
  
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
  
    const sasToken = generateBlobSASQueryParameters({
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse("r"),
      expiresOn: new Date(Date.now() + 15 * 60 * 1000), // valid for 15 min
    }, sharedKeyCredential).toString();
  
    const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
    res.json({ url });
  }catch(ex){
    console.log("Error in api",ex)
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
