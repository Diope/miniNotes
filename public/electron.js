const electron = require('electron');
const path = require('path');
const {app, Tray, ipcMain, BrowserWindow, Menu} = require('electron');

let mainWindow;
let menuTrayIcon;

const NOTES = []
var visible = false;
const WIDTH = 500;
const HEIGHT = 500;
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
    transparent: false
  });

  
  mainWindow.loadURL('http://localhost:3000')

  menuTrayIcon = new Tray(ICON)
  menuTrayIcon.setToolTip('Mini-Note');
  // menuTrayIcon.setContextMenu(quitMenu);

  menuTrayIcon.on('click', (event, bounds, position) => {
    const {screen} = electron; //Needed to get cursor position?
    // if (mainWindow.isVisible()) mainWindow.hide()

    mainWindow.webContents.send('open', bounds)
    const cursor = screen.getCursorScreenPoint();
    const primary = screen.getPrimaryDisplay().workAreaSize;

    mainWindow.setPosition(cursor.x, cursor.y);
    mainWindow.show();
    
    console.log("test", bounds, position, cursor, primary);
  });

  mainWindow.webContents.openDevTools();

  mainWindow.on('blur', () => {
    visible = false;

    mainWindow.hide()
  })

  mainWindow.on('show', () => {
    
    menuTrayIcon.setToolTip('test')
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  })

  ipcMain.on('notes', (event, data = []) => {
    NOTES = data;
  })
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

function appTitle (title = "") {
  const t = title
  const titleCount = t.length;
  const icon = menuTrayIcon.setImage(ICON);

  if (titleCount >= MAX_CHARACTERS) {
    t = t.slice(0, MAX_CHARACTERS - 1) + "…"
  } else {
    t = t.padEnd(MAX_CHARACTERS - titleCount, ' ');
  }

  menuTrayIcon.appTitle(t);
  menuTrayIcon.setToolTip(title);
}