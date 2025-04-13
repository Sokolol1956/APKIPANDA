const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('export-pdf', async (event, args) => {
  const { employeeName, month, netto } = args;

  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Zapisz PDF',
    defaultPath: `wynagrodzenie_${employeeName.replace(/\s+/g, '_')}_${month}.pdf`,
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
  });

  if (!canceled && filePath) {
    const pdfContent = `
      <h1>Rozliczenie wynagrodzenia</h1>
      <p><strong>Pracownik:</strong> ${employeeName}</p>
      <p><strong>Miesiąc:</strong> ${month}</p>
      <p><strong>Netto do wypłaty:</strong> ${netto} PLN</p>
    `;

    const printWindow = new BrowserWindow({ show: false });
    await printWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(pdfContent));

    const pdfData = await printWindow.webContents.printToPDF({});
    fs.writeFileSync(filePath, pdfData);
    printWindow.close();
  }
});