// 模块执行器  https://mp.weixin.qq.com/s/0sardJQmLiM-1Roff6sscg
// 白名单函数，允许使用什么
const ALLOW_LIST = ['console']
class Module {
    // 全局exports对象
    exports = {}
    wrapper = [
        'return (function(exports, modules) {',
        '\n});'
    ]

    wrap(script) {
        return `${this.wrapper[0]} ${script} ${this.wrapper[1]}`
    }

    runInContext(code) {
        code = `width (sandbox) {${code}}`
        const fn = new Function('sandbox', code)
        return (sandbox) => {
            const proxy = new Proxy(sandbox, {
                has(target, key) {
                    if (!ALLOW_LIST.includes(key)) { return true }
                },
                get(target, key, receiver) {
                    if (key === Symbol.unscopables) return undefined

                    Reflect.get(target, key, receiver)
                }
            })

            return fn(proxy)
        }
    }

    compile(content) {
        const wrapper = this.wrap(content)
        const compiledWrapper = this.runInContext(wrapper)({})
        compiledWrapper.call(this.exports, this.exports, this)
    }
}

// 测试执行
function getModuleFromString(code) {
    const scanModule = new Module()
    scanModule.compile(code)
    return scanModule.exports
}

const module = getModuleFromString(`
module.exports = {
  name : 'ConardLi',
  action : function(){
    console.log(this.name);
  }
};
`);

module.action(); // ConardLi