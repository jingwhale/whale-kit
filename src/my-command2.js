// import sketch from 'sketch'
// // documentation: https://developer.sketchapp.com/reference/api/
//
// export default function() {
//   sketch.UI.message("It's alive 🙌")
// }

import BrowserWindow from 'sketch-module-web-view'

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
    win = null
})


// // Load a remote URL
// win.loadURL('https://github.com')

// Load a localhost URL
const Panel = `http://localhost:8000/pagelayout.html#${Math.random()}`;
win.loadURL(Panel)

// // Load a dist
// win.loadURL(require('./dist/index.html'))
