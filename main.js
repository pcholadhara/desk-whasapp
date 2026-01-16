import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path';
import { fileURLToPath } from 'url';
import { registerIpc, setIpcWindow } from "./xdesk/ipcs/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = process.env.NODE_ENV !== 'production' && !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 700,
    autoHideMenuBar: true,
    frame: false,
    maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, './xdesk/preload/preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  win.setMenu(null);

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
	win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
  setIpcWindow(win);
}

app.whenReady().then(() => {
  registerIpc(ipcMain);
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
