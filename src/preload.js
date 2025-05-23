// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('versions', {
  notify: (title, body) => ipcRenderer.invoke('notify',title, body),
  encrypt: (msg) => ipcRenderer.invoke("encrypt", msg),
  
  onMessage: (callback) => ipcRenderer.on('message', (event, data) => callback(data))
})