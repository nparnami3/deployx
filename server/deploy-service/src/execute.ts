import { exec } from "child_process";
import path from "path";
const BASE_DIR = path.join("C:", "Users", "HP", "Desktop", "deployx", "server", "upload-service","dist","output");


export function buildProject(id: string) {
    return new Promise<void>((resolve, reject) => {
        const projectPath = path.join(BASE_DIR,`${id}`);
        const command = `cd ${projectPath} && npm install && npm run build`;

        const child = exec(command, (error, stdout, stderr) => {
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
        child.stdout?.on('data', (data) => {
            console.log('stdout: ' + data);
        });
        child.stderr?.on('data', (data) => {
            console.error('stderr: ' + data);
        });
    });
}
