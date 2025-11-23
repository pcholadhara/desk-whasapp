const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const client = require('./whatsapp');

const isDev = process.env.NODE_ENV !== 'production' && !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  win.setMenu(null);

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow)

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

client.on('qr', (qr) => {
  BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.send('qr', qr);
  });
});

client.on('ready', () => {
  BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.send('ready');
  });
});

client.on('message', async (msg) => {
  try {
    const contact = await msg.getContact();
    const messageData = {
      id: msg.id.id,
      from: contact.number || msg.from.split('@')[0],
      notifyName: contact.pushname || contact.name || 'Unknown',
      body: msg.body,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    BrowserWindow.getAllWindows().forEach(win => {
      win.webContents.send('incoming-message', messageData);
    });
  } catch (error) {
    console.error('Error handling incoming message:', error);
  }
});

ipcMain.on('send-message', async (event, { number, message }) => {
  try {
    const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars
    const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}@c.us`; // add country code and suffix

    const sentMessage = await client.sendMessage(final_number, message);
    console.log('Message sent:', sentMessage);
    event.reply('send-message-status', 'Message sent successfully!');
  } catch (error) {
    console.error('Failed to send message:', error);
    event.reply('send-message-status', `Failed to send message: ${error.message}`);
  }
});
