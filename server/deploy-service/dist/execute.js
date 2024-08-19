"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProject = buildProject;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const BASE_DIR = path_1.default.join("C:", "Users", "HP", "Desktop", "deployx", "server", "upload-service", "dist", "output");
function buildProject(id) {
    return new Promise((resolve, reject) => {
        var _a, _b;
        const projectPath = path_1.default.join(BASE_DIR, `${id}`);
        const command = `cd ${projectPath} && npm install && npm run build`;
        const child = (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            resolve();
        });
        // Optional: Handle additional output streams if needed
        (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            console.log('stdout: ' + data);
        });
        (_b = child.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
            console.error('stderr: ' + data);
        });
    });
}
