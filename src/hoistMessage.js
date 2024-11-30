let mainWindow;

export function setMainWindow(window) {
    mainWindow = window;
}

export function sendMessageToRenderer(channel, data) {
    if (mainWindow) {
        mainWindow.webContents.send(channel, data);
    } else {
        console.error('MainWindow is not defined');
    }
}