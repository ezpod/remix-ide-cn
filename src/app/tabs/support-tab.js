const yo = require('yo-yo')
var css = require('./styles/support-tab-styles')

class SupportTab {

  constructor (localRegistry) {
    this.el = null
    this.gitterIframe = ''
    this.gitterIsLoaded = false
  }

  loadTab () {
    if (this.gitterIsLoaded) return

    const iframe = yo`<iframe class="${css.chatIframe}" src='https://gitter.im/ethereum/remix/~embed'>`
    this.gitterIframe.parentNode.replaceChild(iframe, this.gitterIframe)
    this.gitterIframe = iframe
    this.el.style.display = 'block'
    this.gitterIsLoaded = true
  }

  render () {
    if (this.el) return this.el

    this.gitterIframe = yo`<div></div>`

    const remixd = yo`
      <div class="${css.info}">
        <div class=${css.title}>访问本地文件</div>
        <div class="${css.crow}">
          Remixd是一个允许在Remix IDE中访问本地计算机文件的工具，它也可以用于搭建开发环境。
        </div>
        <div class="${css.crow}">进一步信息:</div>
        <div class="${css.crow}"><a target="_blank" href="https://github.com/ethereum/remixd"> https://github.com/ethereum/remixd</a></div>
        <div class="${css.crow}"><a target="_blank" href="https://remix.readthedocs.io/en/latest/tutorial_remixd_filesystem">http://remix.readthedocs.io/en/latest/tutorial_remixd_filesystem.html</a></div>
        <div class="${css.crow}">安装: <pre class=${css.remixdinstallation}>npm install remixd -g</pre></div>
      </div>`

    const localremixd = yo`
      <div class="${css.info}">
        <div class=${css.title}>本地运行Remix</div>
        <div class="${css.crow}">
          作为一个NPM模块:
        </div>
        <a target="_blank" href="https://www.npmjs.com/package/remix-ide">https://www.npmjs.com/package/remix-ide</a>
        <pre class=${css.remixdinstallation}>npm install remix-ide -g</pre>
        <div class="${css.crow}">
          作为一个electron应用:
        </div>
        <a target="_blank" href="https://github.com/horizon-games/remix-app">https://github.com/horizon-games/remix-app</a>
      </div>`

    this.el = yo`
      <div class="${css.supportTabView}" id="supportView">
        <div class="${css.infoBox}">
          碰到一个问题，找到一个bug或者希望提议一个新的功能特性？请访问
          <a target="_blank" href='https://github.com/ethereum/remix-ide/issues'> issues</a> 或者查看
          <a target="_blank" href='https://remix.readthedocs.io/en/latest/'> the documentation page on Remix</a> 或者
          <a target="_blank" href='https://solidity.readthedocs.io/en/latest/'> Solidity</a>。
        </div>
        <div class="${css.chat}">
          <div class="${css.chatTitle}" onclick=${() => { window.open('https://gitter.im/ethereum/remix') }} title='点击进入Gitter交流频道'>
            <div class="${css.chatTitleText}">ethereum/remix社区交流</div>
          </div>
          ${this.gitterIframe}
        </div>
        ${remixd}
        ${localremixd}
      </div>`

    return this.el
  }

}

module.exports = SupportTab
