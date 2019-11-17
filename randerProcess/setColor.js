const { ipcRenderer } = require('electron')

const spans = document.getElementById('box').querySelectorAll('span')

spans.forEach(item => {
  item.onclick = function() {
    let color = this.dataset['color']
    ipcRenderer.send('pc_calculator_setColor', color)
  }
})
