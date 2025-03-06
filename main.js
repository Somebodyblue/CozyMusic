const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    try {
        const window = new BrowserWindow({
            width: 400,
            height: 733,
            maximizable: true,
            resizable: true,
            autoHideMenuBar: false,
            icon: 'images/CozyMusicLogo.png',
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        window.loadFile('index.html').catch(err => {
            console.error('Failed to load index.html:', err);
        });
    } catch (error) {
        console.error('Error creating window:', error);
    }
};

app.whenReady().then(() => {
    createWindow();
});
