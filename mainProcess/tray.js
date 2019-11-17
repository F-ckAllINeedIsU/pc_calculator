const { Tray, Menu, dialog, nativeImage } = require('electron')
const path = require('path')
function pc_calculator_tray(win) {
  let image = nativeImage.createFromPath(
    path.join(__dirname, '../images/icon.ico')
  )
  let tray = new Tray(image)
  let menu = Menu.buildFromTemplate([
    {
      label: '关闭',
      click: () => {
        dialog
          .showMessageBox({
            type: 'info',
            title: '是否退出',
            message: '请确认是否退出',
            buttons: ['确定', '取消'],
          })
          .then(res => {
            if (res.response === 0) {
              tray.destroy()
              win.destroy()
            }
          })
      },
    },
  ])

  tray.on('click', () => {
    if (win.isVisible()) {
      win.hide()
      win.setSkipTaskbar(true)
    } else {
      win.show()
      win.setSkipTaskbar(false)
    }
  })

  tray.setToolTip('计算器')

  tray.setContextMenu(menu)
}

module.exports = pc_calculator_tray
