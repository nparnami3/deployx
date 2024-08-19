import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: "e921ad063ab83ac239e0f097626eee35",
  secretAccessKey: "7c1ebc03c45ff3d1461ca8ffda591226d95ea9754924ef6012ce49e40d455f32",
  endpoint: "https://017eabcdfed1100779ef7e21ea52547b.r2.cloudflarestorage.com"
})

const app = express();

app.get("/*", async (req, res) => {
    // id.100xdevs.com
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "buildx-deploy",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);