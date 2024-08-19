//Acces key: e921ad063ab83ac239e0f097626eee35
//Secret Key : 7c1ebc03c45ff3d1461ca8ffda591226d95ea9754924ef6012ce49e40d455f32
//end point: https://017eabcdfed1100779ef7e21ea52547b.r2.cloudflarestorage.com

import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
    accessKeyId: "e921ad063ab83ac239e0f097626eee35",
    secretAccessKey: "7c1ebc03c45ff3d1461ca8ffda591226d95ea9754924ef6012ce49e40d455f32",
    endpoint: "https://017eabcdfed1100779ef7e21ea52547b.r2.cloudflarestorage.com"
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "buildx-deploy",
        Key: fileName,
    }).promise();
    console.log(response);
}