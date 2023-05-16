const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

let mainWindow;

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        frame: false,
        width: 800,
        height: 550
    })
    mainWindow.setMinimumSize(220, 140);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "pages/main.html"),
        protocol: "file:"
    }))
})