// ./main.js
var url = require('url')
const path = require('path');
const {app, BrowserWindow} = require('electron')
let win = null;

function createWindow() {
  // Initialize the window to our specified dimensions
  const screen = require('electron').screen
  const display = screen.getPrimaryDisplay()

  win = new BrowserWindow(
  {
      width: display.workArea.width,
      height: display.workArea.height,
      icon:path.join(__dirname, ''), //icon
      "node-integration": "iframe", // and this line
      "web-preferences": {
        "web-security": false
      },
      backgroundColor: '#F9F9F9',
      useContentSize: true
  });
  win.setResizable(false)


  const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        });
  // Specify entry point to default entry point of vue.js
  //win.loadURL('http://localhost:8080');
win.loadURL(startUrl);


  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

}

//create the application window if the window variable is null
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})


app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
