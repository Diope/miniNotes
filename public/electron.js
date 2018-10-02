const electron = require('electron');
const path = require('path');
const {app, Tray, ipcMain, BrowserWindow} = require('electron');

let mainWindow;
let menuTrayIcon;

const NOTES = []
const WIDTH = 575;
const HEIGHT = 650;
const MAX_CHARACTERS = 45;
const IMAGE = 'icon@2x.png'
const IMAGE_PATH = path.join(__dirname, '../assets/images')

const ICON = path.join(IMAGE_PATH, IMAGE)

function createWindow() {
  
  // menuTrayIcon = new Tray(ICON)
  
  mainWindow = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
    show: false,
    frame: false,
    transparent: true
  });

  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  } else {
    mainWindow.loadURL('http://localhost:3000')
  }

  menuTrayIcon = new Tray(ICON)
  menuTrayIcon.setToolTip('Mini-Notes');
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})