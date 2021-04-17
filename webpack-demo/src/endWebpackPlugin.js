class EndWebpackPlugin {
  constructor(doneCb, failCb) {
    this.doneCb = doneCb;
    this.failCb = failCb;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('EndWebpackPlugin', (compilation, callback) => {
      compilation.plugin('done', stats => {
        this.doneCb(stats)
        callback()
      })
      compilation.plugin('failed', stats => {
        this.failCb(stats)
        callback()
      })
    })

  }
}

module.exports = {
  EndWebpackPlugin
}