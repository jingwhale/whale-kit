import BrowserWindow from 'sketch-module-web-view'

/** 生成webview **/
let win = new BrowserWindow({ width: 800, height: 600 });
win.on('closed', () => {
    win = null
});

// // Load a remote URL
// win.loadURL('https://github.com')

// // Load a dist
// win.loadURL(require('./dist/index.html'))

// Load a localhost URL
const Panel = `http://localhost:8000#${Math.random()}`;
win.loadURL(Panel);


/** 监听webview的事件：webview->plugin **/

var contents = win.webContents;

//监听webview的事件：webview->plugin
contents.on('fromwebview', function(s) {
    console.log(s.name);
});


/** 主动执行webview代码，发送数据 **/
var data = {
    name: "json",
    type: "come from plugin object data!"
};
//执行webview的代码
const getData = () => {
    contents
        .executeJavaScript(`someGlobalFunctionDefinedInTheWebview(${JSON.stringify(data)})`)
        .then(res => {
            // do something with the result
            console.log("send data success,from plugin to webview!")
        })
};
//主动执行webview代码，发送数据
contents.on("did-start-loading", () => getData());
