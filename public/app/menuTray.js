const electron = require('electron');
const {Tray, app, Menu} = electron;

class menuTray extends Tray {
  constructor(icon, mainWindow) {
    super (icon)

    this.mainWindow = mainWindow;
    this.setToolTip("miniNote")
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
  }

  onClick(event, bounds) {
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) this.mainWindow.hide();
    
    this.mainWindow.setBounds({x: x - width / 2, y: yPosition, height, width});
    this.mainWindow.show();
  }

  onRightClick() {
    const rightClickMenu = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => app.quit()
      }
    ])
    this.popUpContextMenu(rightClickMenu)
  }
}

module.exports = menuTray;