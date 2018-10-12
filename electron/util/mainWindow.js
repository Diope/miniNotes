const electron = require('electron');
const {BrowserWindow} = electron;

class MainWindow extends BrowserWindow {
  constructor(path) {
    super({
      height: 300,
      width: 500,
      show: false,
      frame: false,
      transparent: false,
      resizable: false,
    })


    this.loadURL(path)
    this.on('blur', this.onBlur.bind(this))
    this.setVisibleOnAllWorkspaces(true)
  }
  onBlur() {
    this.hide()
  }

}

module.exports = MainWindow;