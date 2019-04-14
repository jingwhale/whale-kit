import BrowserWindow from 'sketch-module-web-view'

/** 生成webview **/
let win = new BrowserWindow({ width: 800, height: 600, title:"Efficient design spec"});
win.on('closed', () => {
    win = null
});

// // Load a remote URL
win.loadURL('https://www.jingwhale.cc/');

// // Load a dist
// win.loadURL(require('./dist/index.html'))

// Load a localhost URL
// const Panel = `http://localhost:8000#${Math.random()}`;
// win.loadURL(Panel);


