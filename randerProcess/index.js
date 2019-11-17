const { ipcRenderer } = require('electron')
const math = require('mathjs')

const resultText = document.querySelector('.result-text')

resultText.style.color = localStorage.getItem('resultTextColor')
resultText.style.fontSize = localStorage.getItem('resultTextFontSize') + 'px'

// 颜色
ipcRenderer.on('pc_calculator_setColorToRender', (event, color) => {
  resultText.style.color = color
  localStorage.setItem('resultTextColor', color)
})

// 字体
ipcRenderer.on('pc_calculator_addFontSize', () => {
  let fontSize = window.getComputedStyle(resultText, null).fontSize
  let newFontSize = fontSize.replace('px', '') - 0 + 3
  if (newFontSize >= 80) return
  resultText.style.fontSize = newFontSize + 'px'
  localStorage.setItem('resultTextFontSize', newFontSize)
})

ipcRenderer.on('pc_calculator_subFontSize', () => {
  let fontSize = window.getComputedStyle(resultText, null).fontSize
  let newFontSize = fontSize.replace('px', '') - 3
  if (newFontSize <= 20) return
  resultText.style.fontSize = newFontSize + 'px'
  localStorage.setItem('resultTextFontSize', newFontSize)
})

ipcRenderer.on('pc_calculator_defultFontSize', () => {
  resultText.style.fontSize = '50px'
  localStorage.setItem('resultTextFontSize', newFontSize)
})

// 计算
let result = ''
let main = {
  // 判断是否计算过结果
  isCalc: false,
  clickNum(num) {
    if (this.isCalc) {
      result = ''
      resultText.innerHTML = 0
      this.isCalc = false
    }
    // 判断小数点
    if (result.indexOf('.') !== -1 && num === '.') return
    result.toString()
    result = result + num
    resultText.innerHTML = result
  },
  reset() {
    result = ''
    resultText.innerHTML = 0
  },
  clickopt(opt) {
    this.isCalc = false
    switch (opt) {
      case '+/-':
        result = math.evaluate(result + '*-1')
        resultText.innerHTML = result
        break
      case '%':
        result = math.format(math.evaluate(result + '/100'), 4)
        resultText.innerHTML = result
        break
      default:
        result = result + opt
        resultText.innerHTML = result
        break
    }
  },
  calc() {
    result = math.evaluate(result).toString()
    resultText.innerHTML = result
    this.isCalc = true
  },
}

document.oncontextmenu = () => {
  ipcRenderer.send('pc_calculator_shoeContextMenu')
}
