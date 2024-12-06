import { app, BrowserWindow, Tray, Menu, nativeImage } from 'electron';
import { join } from 'node:path';
import { updateElectronApp } from 'update-electron-app';
import { forceQuitTor, startupTor, checkTor } from '../ipc/controllers/tor.js';
import { setMainWindow } from '../ipc/utils/hoistMessage.js';
import { setupHandlers } from "../ipc/ipcHandlers.js"
import "../ipc/controllers/dbController.js"

let isQuitting = false;
let mainWindow = null
let closeApp = null
let tray = null

if (process.env.NODE_ENV !== 'development') {
  if (require('electron-squirrel-startup')) {
    app.quit();
  }
  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })
  }
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 750,
    icon: "./public/icon.ico",
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  setMainWindow(mainWindow)

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("close", (event) => {
    if (!closeApp) {
      event.preventDefault()
      mainWindow.hide()
    } else {
      app.quit()
    }
  })

  mainWindow.once("ready-to-show", () => {
    startupTor((cb) => {
      if (cb) {
        console.info("Checking Tor Connection...")
        checkTor()
      }
    })
  })

  mainWindow.maximize()

};

app.whenReady().then(() => {
  createWindow();
  setupHandlers(mainWindow);
  const icon = nativeImage.createFromPath(join(__dirname, "icon.png"))
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: () => {
        closeApp = true
        if (process.platform !== 'darwin') {
          app.quit();
        }
      }
    },
    {
      label: 'Show Window',
      click: () => {
        mainWindow.show()
      }
    },
  ])
  tray.setToolTip('Home Chat')
  tray.setTitle('Home Chat')
  tray.setContextMenu(contextMenu)
  tray.addListener("click", () => mainWindow.show())
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("before-quit", async (event) => {
  if (!isQuitting) {
    event.preventDefault();
    try {
      console.log("Force quitting the Tor process...");
      forceQuitTor();
    } catch (error) {
      console.error("Failed to quit Tor process:", error);
    } finally {
      isQuitting = true;
      app.quit();
    }
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

updateElectronApp()
