// ipcHandlers.js
import { ipcMain } from 'electron';
import { HomeRSA } from './controllers/rsa.js';
import { notify } from './utils/processStart.js';

const rsa = new HomeRSA()

export const setupHandlers = (mainWindow) => {
    
    ipcMain.handle('notify', (event, title, body) => {
        if (!mainWindow.isFocused()) {
            notify(title, body);
        }
    });

    ipcMain.handle('encrypt', (event, msg) => {
        const encryptedMsg = encryptOwn(msg);
        console.log(encryptedMsg);
        return encryptedMsg;
    });
}