const { app, BrowserWindow } = require('electron')
const { ipcMain, dialog } = require('electron');
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
      resizable: false,
      autoHideMenuBar: true,
      // width: 800,
      // height: 600,
      width: 400,
      height: 200,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    })
  
    win.loadFile('index.html')
  }

  ipcMain.handle('dialog:open', async (_, args) => {
    const result = await dialog.showOpenDialog({ properties: ['openFile'] })
    return result
  })
  ipcMain.handle('dialogFolder:open', async (_, args) => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
    return result
  })
// a enlever
  try {
    require('electron-reloader')(module)
  } catch (_) {}
  

  app.whenReady().then(() => {
    
    createWindow()
    
  })
  