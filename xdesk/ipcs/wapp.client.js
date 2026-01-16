import {Client} from 'whatsapp-web.js';

let wclient             = new Client();
let clientInitialized   = false;
let browserWindow       = null;

export const setWhatsAppWindow = (win) => {
    browserWindow = win;
};

export const whatsApp = (ipcMain) => {
    if (!clientInitialized) {
        // These listeners should be attached only once
        wclient.on('qr', (qr) => {
            if (browserWindow) {
                browserWindow.webContents.send('whatsapp:qr', qr);
            }
        });

        wclient.on('ready', () => {
            
            const info = wclient.info;
          
            console.log('Client Info:', info);
            if (browserWindow) {
                browserWindow.webContents.send('whatsapp:ready', info);
            }
        });

        wclient.on('authenticated', () => {
            console.log('WhatsApp client authenticated');
        });

        wclient.on('auth_failure', (msg) => {
            console.error('WhatsApp authentication failure:', msg);
            if (browserWindow) {
                browserWindow.webContents.send('whatsapp:auth_failure', msg);
            }
        });
    }

    // This handler can be called multiple times, but the client will only be initialized once.
    ipcMain.handle('wapp', async () => {
        if (!clientInitialized) {
            console.log('Initializing WhatsApp client...');
            wclient.initialize();
            clientInitialized = true;
        } else {
            console.log('WhatsApp client already initializing/initialized.');
        }
        return true;
    });

    ipcMain.on('send-message', async (event, { number, message }) => {
        try {
            const sanitized_number = number.toString().replace(/[- )(]/g, "");
            const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}@c.us`;

            if (wclient && clientInitialized) {
                await wclient.sendMessage(final_number, message);
                if (browserWindow) {
                    browserWindow.webContents.send('send-message-status', 'Message sent successfully!');
                }
            } else {
                if (browserWindow) {
                    browserWindow.webContents.send('send-message-status', 'WhatsApp client not ready.');
                }
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            if (browserWindow) {
                browserWindow.webContents.send('send-message-status', `Failed to send message: ${error.message}`);
            }
        }
    });

    wclient.on('message', msg => {
        try {
            const payload = {
                from: msg.from,
                name: msg._data?.notifyName || msg._data?.pushname || '',
                body: msg.body,
                time: msg.timestamp,
            };
            if(browserWindow) {
                // Send to renderer window
                browserWindow.webContents.send('incoming-message', payload);
            }

        } catch (err) {
            console.error('IPC incoming-message error:', err);
        }
    });
};


