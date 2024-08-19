"use strict";
//Acces key: e921ad063ab83ac239e0f097626eee35
//Secret Key : 7c1ebc03c45ff3d1461ca8ffda591226d95ea9754924ef6012ce49e40d455f32
//end point: https://017eabcdfed1100779ef7e21ea52547b.r2.cloudflarestorage.com
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const s3 = new aws_sdk_1.S3({
    accessKeyId: "e921ad063ab83ac239e0f097626eee35",
    secretAccessKey: "7c1ebc03c45ff3d1461ca8ffda591226d95ea9754924ef6012ce49e40d455f32",
    endpoint: "https://017eabcdfed1100779ef7e21ea52547b.r2.cloudflarestorage.com"
});
// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const response = yield s3.upload({
        Body: fileContent,
        Bucket: "buildx-deploy",
        Key: fileName,
    }).promise();
    console.log(response);
});
exports.uploadFile = uploadFile;
