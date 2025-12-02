const { contextBridge, ipcRenderer } = require('electron');
console.log('Preload script loaded');
contextBridge.exposeInMainWorld("api", {
    on: (channel, callback) => {
        const validChannels = ["whatsapp:qr", "whatsapp:ready", "whatsapp:auth_failure", "send-message-status", "incoming-message"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => callback(...args));
        }
    },
    send: (channel, data) => {
        const validChannels = ["send-message"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    httpRequest : (options) => ipcRenderer.invoke("http-request", options),
    dbRequest   : (options) => ipcRenderer.invoke("db-request", options),
    whatsApp    : (options) => ipcRenderer.invoke("wapp", options),
});

