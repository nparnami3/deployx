import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";

const s3 = new S3({
    accessKeyId: "e921ad063ab83ac239e0f097626eee35",
    secretAccessKey: "7c1ebc03c45ff3d1461ca8ffda591226d95ea9754924ef6012ce49e40d455f32",
    endpoint: "https://017eabcdfed1100779ef7e21ea52547b.r2.cloudflarestorage.com"
})
const BASE_DIR = path.join("C:", "Users", "HP", "Desktop", "deployx", "server", "upload-service","dist","output");
// output/asdasd
export async function downloadS3Folder(prefix: string) {
    const allFiles = await s3.listObjectsV2({
        Bucket: "buildx-deploy",
        Prefix: prefix
    }).promise();
    
    // 
    const allPromises = allFiles.Contents?.map(async ({Key}) => {
        return new Promise(async (resolve) => {
            if (!Key) {
                resolve("");
                return;
            }
            const finalOutputPath = path.join(BASE_DIR, Key);
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);
            if (!fs.existsSync(dirName)){
                fs.mkdirSync(dirName, { recursive: true });
            }
            s3.getObject({
                Bucket: "buildx-deploy",
                Key
            }).createReadStream().pipe(outputFile).on("finish", () => {
                resolve("");
            })
        })
    }) || []
    console.log("awaiting");

    await Promise.all(allPromises?.filter(x => x !== undefined));
}

export function copyFinalDist(id: string) {
    const folderPath = path.join(BASE_DIR,`${id}/dist`);
    const allFiles = getAllFiles(folderPath);
    // allFiles.forEach(file => {
    //     uploadFile(`dist/${id}/` + file.slice(folderPath.length + 1), file);
    // })
    allFiles.forEach(file => {
        const relativePath = path.relative(folderPath, file);
        uploadFile(`dist/${id}/` + relativePath, file);
    });
}

const getAllFiles = (folderPath: string) => {
    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            response.push(fullFilePath);
        }
    });
    return response;
}

const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "buildx-deploy",
        Key: fileName,
    }).promise();
    console.log(response);
}