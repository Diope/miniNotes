const electron = require('electron');
const path = require('path');
const {app, Tray, ipcMain, BrowserWindow, Menu} = require('electron');

let mainWindow;
let menuTrayIcon;

const NOTES = []
var visible = false;
const WIDTH = 500;
const HEIGHT = 300;
const MAX_CHARACTERS = 45;
const IMAGE = 'icon@2x.png'
const IMAGE_PATH = path.join(__dirname, '../assets/images')

const ICON = path.join(IMAGE_PATH, IMAGE);
const rightMenu = [
  {
    label: 'Quit',
    click: () => app.quit()
  }
]
const menu = Menu.buildFromTemplate(rightMenu)

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
  menuTrayIcon.on('right-click', (menuTrayIcon) => {
    menuTrayIcon.popUpContextMenu(menu)
 })


  menuTrayIcon.on('click', (event, bounds, position) => {
    const {x, y} = bounds;
    const {height, width} = mainWindow.getBounds()
    const {screen} = electron; //Needed to get cursor position?
    if (mainWindow.isVisible()) mainWindow.hide()

    mainWindow.webContents.send('open', bounds)
    const cursor = screen.getCursorScreenPoint();
    const primary = screen.getPrimaryDisplay().workAreaSize;

    mainWindow.setPosition(cursor.x, cursor.y);
    mainWindow.show();
    
    console.log("test", bounds, position, cursor, primary);
  });
  menuTrayIcon.on('right-click', () => {
    
  })

  mainWindow.webContents.openDevTools();

  mainWindow.on('blur', () => {
    mainWindow.hide()
  })

  mainWindow.on('show', () => {
    menuTrayIcon.setToolTip('miniNote')
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})
