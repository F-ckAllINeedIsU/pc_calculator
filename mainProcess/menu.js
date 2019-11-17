const { Menu, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')

const template = [
  {
    label: '计算器',
    submenu: [
      {
        label: '关于',
        click: function() {
          pc_calculator_about()
        },
      },
      {
        label: '退出',
        click: function(menuItem, browserWindow, event) {
          dialog
            .showMessageBox({
              type: 'info',
              title: '是否退出',
              message: '请确认是否退出',
              buttons: ['确定', '取消'],
            })
            .then(data => {
              if (data.response === 0) {
                browserWindow.destroy()
              }
            })
        },
      },
    ],
  },
  {
    label: '格式',
    submenu: [
      {
        label: '颜色',
        accelerator: (function() {
          // 判断系统类型
          if (process.platform === 'darwin') {
            return 'Cmd + Shift + C'
          } else {
            return 'Ctrl + Shift + C'
          }
        })(),
        click: function() {
          pc_calculator_color()
        },
      },
      {
        label: '字体增大',
        accelerator: 'F11',
        click: function(menuItem, browserWindow, event) {
          browserWindow.webContents.send('pc_calculator_addFontSize')
        },
      },
      {
        label: '字体减小',
        accelerator: 'F12',
        click: function(menuItem, browserWindow, event) {
          browserWindow.webContents.send('pc_calculator_subFontSize')
        },
      },
      {
        label: '默认字体',
        accelerator: 'F10',
        click: function(menuItem, browserWindow, event) {
          browserWindow.webContents.send('pc_calculator_defultFontSize')
        },
      },
    ],
  },
]

const menu = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(menu)

function pc_calculator_about() {
  let win = new BrowserWindow({
    width: 250,
    height: 250,
    title: '关于',
    resizable: false,
  })
  win.loadURL(path.join(__dirname, '../views/about.html'))
  win.setMenu(null)
}

function pc_calculator_color() {
  let win = new BrowserWindow({
    width: 250,
    height: 100,
    title: '选择颜色',
    // resizable: false,
    webPreferences: {
      nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
    },
  })
  win.loadURL(path.join(__dirname, '../views/color.html'))
  // win.webContents.openDevTools()
  win.setMenu(null)
}

ipcMain.on('pc_calculator_shoeContextMenu', () => {
  menu.popup()
})
