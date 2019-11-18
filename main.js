// electron项目的入口文件
// 开启一个应用，需要引入app
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// 当我们启动main.js文件的时候，会自动的触发app的ready事件
app.on('ready', function() {
  // 这个事件中，一般进行当前应用的窗口的创建
  pc_calculator_createWindow()
})

// 通过一个函数来创建应用的窗口
function pc_calculator_createWindow() {
  let win = new BrowserWindow({
    // 宽度
    width: 300,
    // 高度
    height: 490,
    // 标题
    title: '计算器',
    // resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  win.loadURL(path.join(__dirname, './views/index.html'))

  // // 开发者工具
  // win.webContents.openDevTools()

  win.on('close', function(e) {
    e.preventDefault()
    win.hide()
    win.setSkipTaskbar(true)
    // // 释放 win
    // win = null
    // // 退出 app
    // app.quit
  })

  win.on('ready-to-show', function(e) {
    win.show()
    win.focus()
  })

  // 引入 menu
  require('./mainProcess/menu')
  const pc_calculator_tray = require('./mainProcess/tray')
  pc_calculator_tray(win)
  // 通过ipcMain监听渲染进程发送过来的消息
  ipcMain.on('pc_calculator_setColor', function(event, color) {
    // console.log(color)
    // 从主进程向渲染进程发送消息
    // event.sender.send('hm_setColorToRender',color)
    // 使用win.webContents来实现消息的发送
    win.webContents.send('pc_calculator_setColorToRender', color)
  })
}
