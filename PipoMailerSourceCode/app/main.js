

const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

process.env.NODE_ENV = 'production';
let mainWindow;

// listen for app ready

app.on('ready', function(){
  // create window 
  mainWindow = new BrowserWindow({});

  // load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // build menu from our template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert menu
  Menu.setApplicationMenu(mainMenu);
});

app.on('window-all-closed', () => {
  app.quit()
})







// Create menu or template

const mainMenuTemplate = [
  {
    label: 'File',
    submenu:[
      {
        role: 'reload',
        accelerator: process.platform == 'darwin' ? 'Command+R' : 'Ctrl+R',
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Contact Us',
    submenu:[
      {
        label: 'Contact Us',
        click() {
          createAddWindow();
        }
      }
    ]
  }
];

function createAddWindow(){
  addWindow = new BrowserWindow({
    width: 500,
    height: 300,
    title:'Contact Us'
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'aboutus.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  addWindow.on('close', function(){
    addWindow = null;
  });
}

//  if mac add extra space instead of ELectron
if ( process.platform == 'darwin' ){
  mainMenuTemplate.unshift(
    { 
      label : ""
    }
  );
}

//  add dev tools if not in prod mode
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })

};

