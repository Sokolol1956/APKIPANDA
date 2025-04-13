const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  exportPdf: (data) => ipcRenderer.send('export-pdf', data)
});