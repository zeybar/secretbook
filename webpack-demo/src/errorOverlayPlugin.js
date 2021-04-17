class ErrorOverlayPlugin {
  constructor(option) {
    this.option = option
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ErrorOverlayPlugin', (compilation, callback) => {
      console.log('开始等待')
      // 插件就跟在生产线上新家一道工序 一样，会阻塞后面插件的运行
      setTimeout(() => {
        console.log('执行')
        callback()
      }, 5000)
    })
  }
}

module.exports = {
  ErrorOverlayPlugin,
}