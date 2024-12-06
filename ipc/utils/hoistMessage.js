let mainWindow;

export const setMainWindow = (window) => {
    mainWindow = window;
}

export const sendMessageToRenderer = (channel, data) => {
    if (mainWindow) {
        mainWindow.webContents.send(channel, data);
    } else {
        console.error('MainWindow is not defined');
    }
}