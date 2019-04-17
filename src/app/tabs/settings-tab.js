var yo = require('yo-yo')
var csjs = require('csjs-inject')
var remixLib = require('remix-lib')

const defaultPlugins = require('../plugin/plugins')
var globalRegistry = require('../../global/registry')
var tooltip = require('../ui/tooltip')
var copyToClipboard = require('../ui/copy-to-clipboard')
var styleGuide = require('../ui/styles-guide/theme-chooser')
var styles = styleGuide.chooser()
var Storage = remixLib.Storage
var EventManager = require('../../lib/events')

module.exports = class SettingsTab {
  constructor (localRegistry) {
    const self = this
    self._components = {}
    self._components.registry = localRegistry || globalRegistry
    // dependencies
    self._deps = {
      config: self._components.registry.get('config').api,
      editorPanel: self._components.registry.get('editorpanel').api,
      editor: self._components.registry.get('editor').api
    }
    self._view = { /* eslint-disable */
      el: null,
      optionVM: null, personal: null, warnPersonalMode: null, generateContractMetadata: null,
      pluginInput: null, versionSelector: null, version: null,
      theme: { dark: null, light: null, clean: null },
      plugins: {},
      config: {
        general: null, themes: null,
        plugin: null
      }
    } /* eslint-enable */
    self.data = {}
    self.event = new EventManager()
    self._components.themeStorage = new Storage('style:')
    self.data.currentTheme = self._components.themeStorage.get('theme') || 'light'
  }
  render () {
    const self = this
    if (self._view.el) return self._view.el

    // Gist settings
    var gistAccessToken = yo`<input id="gistaccesstoken" type="password">`
    var token = self._deps.config.get('settings/gist-access-token')
    if (token) gistAccessToken.value = token
    var gistAddToken = yo`<input class="${css.savegisttoken}" id="savegisttoken" onclick=${() => { self._deps.config.set('settings/gist-access-token', gistAccessToken.value); tooltip('Access token saved') }} value="保存" type="button">`
    var gistRemoveToken = yo`<input id="removegisttoken" onclick=${() => { gistAccessToken.value = ''; self._deps.config.set('settings/gist-access-token', ''); tooltip('Access token removed') }} value="删除" type="button">`
    self._view.gistToken = yo`<div class="${css.checkboxText}">${gistAccessToken}${copyToClipboard(() => self._deps.config.get('settings/gist-access-token'))}${gistAddToken}${gistRemoveToken}</div>`
    //
    self._view.optionVM = yo`<input onchange=${onchangeOption} id="alwaysUseVM" type="checkbox">`
    if (self._deps.config.get('settings/always-use-vm')) self._view.optionVM.setAttribute('checked', '')
    self._view.personal = yo`<input onchange=${onchangePersonal} id="personal" type="checkbox">`
    if (self._deps.config.get('settings/personal-mode')) self._view.personal.setAttribute('checked', '')
    var warnText = `通过Web3发送的交易将使用web3.personal API - 请在启用前确保所连接的节点已经启用该API。
    在个人模式下允许在Remix界面中提供账号的密码而无需解锁账号。
    虽然这样很方便，但你需要完全信任所连接的节点（Geth, Parity, ...）
    不推荐在使用注入的Web3对象时（Mist, Metamask, ...）或JavaScript虚拟机环境下启用这个模式。
    Remix永远不会保存任何密码信息。`.split('\n').map(s => s.trim()).join(' ')
    self._view.warnPersonalMode = yo`<i title=${warnText} class="${css.icon} fa fa-exclamation-triangle" aria-hidden="true"></i>`
    self._view.generateContractMetadata = yo`<input onchange=${onchangeGenerateContractMetadata} id="generatecontractmetadata" type="checkbox">`
    if (self._deps.config.get('settings/generate-contract-metadata')) self._view.generateContractMetadata.setAttribute('checked', '')
    self._view.pluginInput = yo`<textarea rows="4" cols="70" id="plugininput" type="text" class="${css.pluginTextArea}" ></textarea>`

    self._view.theme.light = yo`<input onchange=${onswitch2lightTheme} class="${css.col1}" name="theme" id="themeLight" type="radio">`
    self._view.theme.dark = yo`<input onchange=${onswitch2darkTheme} class="${css.col1}" name="theme" id="themeDark" type="radio">`
    self._view.theme.clean = yo`<input onchange=${onswitch2cleanTheme} class="${css.col1}" name="theme" id="themeClean" type="radio">`
    self._view.theme[self.data.currentTheme].setAttribute('checked', 'checked')

    self._view.config.general = yo`
      <div class="${css.info}">
          <div class=${css.title}>常规设置</div>
          <div class="${css.crow}">
            <div>${self._view.generateContractMetadata}</div>
            <span class="${css.checkboxText}">生成合约元数据。在合约文件夹下生成JSON文件。允许指定合约依赖的库地址。如果未指定库地址，Remix将自动部署依赖库。</span>
          </div>
          <div class="${css.crow}">
            <div>${self._view.optionVM}</div>
            <span class="${css.checkboxText}">始终在载入时使用以太坊虚拟机</span>
          </div>
          <div class="${css.crow}">
            <div><input id="editorWrap" type="checkbox" onchange=${function () { self._deps.editor.resize(this.checked) }}></div>
            <span class="${css.checkboxText}">文本自动折行</span>
          </div>
          <div class="${css.crow}">
            <div>${self._view.personal}></div>
            <span class="${css.checkboxText}">启用个人模式 ${self._view.warnPersonalMode}></span>
          </div>
      </div>
      `
    self._view.gistToken = yo`
      <div class="${css.info}">
        <div class=${css.title}>Gist访问令牌</div>
        <div class="${css.crowNoFlex}">管理用于发布到Gist以及获取Github内容的访问令牌</div>
        <div class="${css.crowNoFlex}">点击下面的链接创建一个新的令牌，然后保存到Remix中。确保这个令牌只有'create gist' 权限。</div>
        <div class="${css.crowNoFlex}"><a target="_blank" href="https://github.com/settings/tokens">https://github.com/settings/tokens</a></div>
        <div class="${css.crowNoFlex}">${self._view.gistToken}</div>
      </div>`
    self._view.config.themes = yo`
      <div class="${css.info}">
        <div class=${css.title}>用户界面主题</div>
        <div class=${css.attention}>
          <i title="选择主题" class="${css.icon} fa fa-exclamation-triangle" aria-hidden="true"></i>
          <span>切换用户界面主题将触发页面重新载入</span>
        </div>
        <div class="${css.crow}">
          ${self._view.theme.light}
          <label for="themeLight">浅色主题</label>
        </div>
        <div class="${css.crow}">
          ${self._view.theme.dark}
          <label for="themeDark">深色主题</label>
        </div>
        <div class="${css.crow}">
          ${self._view.theme.clean}
          <label for="themeClean">纯净主体</label>
        </div>
      </div>`
    self._view.config.plugins = yo`<div></div>`
    self._view.config.plugin = yo`
      <div class="${css.info}">
        <div class=${css.title}>插件 <i title="这一部分的功能还在密集开发中，请谨慎使用" class="${css.icon} fa fa-exclamation-triangle" aria-hidden="true"></i> </div>
        <div class="${css.crowNoFlex}">
          <div>从JSON描述中载入插件: </div>
          ${self._view.pluginInput}
          <input onclick=${onloadPluginJson} type="button" value="载入" class="${css.initPlugin}">
          ${self._view.config.plugins}
        </div>
      </div>`
    self._view.el = yo`
      <div class="${css.settingsTabView}" id="settingsView">
        ${self._view.config.general}
        ${self._view.config.plugin}
        ${self._view.gistToken}
        ${self._view.config.themes}
      </div>`

    function loadPlugins (plugins, opt) {
      for (var k in plugins) {
        (function (plugin) {
          if (!self._view.plugins[plugin.title]) self._view.plugins[plugin.title] = {}
          self._view.plugins[plugin.title].json = plugin
          self._view.plugins[plugin.title].el = yo`<div title=${plugin.title} class="${css.pluginLoad}">
          <div class="${css.aPlugin}" onclick=${() => { onLoadPlugin(plugin.title) }}>${plugin.title}</div>
          ${opt.removable ? yo`<span class="${css.removePlugin}" onclick=${() => { onRemovePlugin(plugin.title) }}><i class="fa fa-close"></i></span>` : yo`<span></span>`}
          </div>`
          self._view.config.plugins.appendChild(self._view.plugins[plugin.title].el)
        })(plugins[k])
      }
    }

    function getSavedPlugin () {
      var savedPlugin = self._deps.config.get('settings/plugins-list')
      return savedPlugin ? JSON.parse(savedPlugin) : {}
    }
    function setSavedPlugin (savedPlugins) {
      self._deps.config.set('settings/plugins-list', JSON.stringify(savedPlugins))
    }
    loadPlugins(defaultPlugins, {removable: false})
    loadPlugins(getSavedPlugin(), {removable: true})

    function onLoadPlugin (name) {
      self.event.trigger('plugin-loadRequest', [self._view.plugins[name].json])
    }
    function onRemovePlugin (name) {
      var savedPlugin = getSavedPlugin()
      delete savedPlugin[name]
      setSavedPlugin(savedPlugin)
      if (self._view.plugins[name]) {
        self._view.plugins[name].el.parentNode.removeChild(self._view.plugins[name].el)
        delete self._view.plugins[name]
      }
    }
    function onloadPluginJson (event) {
      try {
        var json = JSON.parse(self._view.pluginInput.value)
      } catch (e) {
        return tooltip('cannot parse the plugin definition to JSON')
      }
      var savedPlugin = getSavedPlugin()
      if (self._view.plugins[json.title]) return tooltip('Plugin already loaded')
      savedPlugin[json.title] = json
      setSavedPlugin(savedPlugin)
      loadPlugins([json], {removable: true})
    }

    function onchangeGenerateContractMetadata (event) {
      self._deps.config.set('settings/generate-contract-metadata', !self._deps.config.get('settings/generate-contract-metadata'))
    }
    function onchangeOption (event) {
      self._deps.config.set('settings/always-use-vm', !self._deps.config.get('settings/always-use-vm'))
    }
    function onswitch2darkTheme (event) {
      styleGuide.switchTheme('dark')
      window.location.reload()
    }
    function onswitch2lightTheme (event) {
      styleGuide.switchTheme('light')
      window.location.reload()
    }
    function onswitch2cleanTheme (event) {
      styleGuide.switchTheme('clean')
      window.location.reload()
    }
    function onchangePersonal (event) {
      self._deps.config.set('settings/personal-mode', !self._deps.config.get('settings/personal-mode'))
    }
    return self._view.el
  }
}

const css = csjs`
  .settingsTabView {
    padding: 2%;
    display: flex;
  }
  .info {
    ${styles.rightPanel.settingsTab.box_SolidityVersionInfo};
    margin-bottom: 1em;
    word-break: break-word;
  }
  .title {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 1em;
  }
  .crow {
    display: flex;
    overflow: auto;
    clear: both;
    padding: .2em;
  }
  .checkboxText {
    font-weight: normal;
  }
  .crow label {
    cursor:pointer;
  }
  .crowNoFlex {
    overflow: auto;
    clear: both;
  }
  .attention {
    margin-bottom: 1em;
    padding: .5em;
    font-weight: bold;
  }
  .heading {
    margin-bottom: 0;
  }
  .explaination {
    margin-top: 3px;
    margin-bottom: 3px;
  }
  input {
    margin-right: 5px;
    cursor: pointer;
    width: inherit;
  }
  input[type=radio] {
    margin-top: 2px;
  }
  .pluginTextArea {
    font-family: unset;
  }
  .pluginLoad {
    vertical-align: top;
    ${styles.rightPanel.settingsTab.button_LoadPlugin};
    width: inherit;
    display: inline-block;
  }
  .initPlugin {
    vertical-align: top;
    ${styles.rightPanel.settingsTab.button_initPlugin};
    width: inherit;
    display: block;
    max-height: inherit;
    padding:7px;
  }

  .removePlugin {
    cursor: pointer;
  }
  i.warnIt {
    color: ${styles.appProperties.warningText_Color};
  }
  .icon {
    margin-right: .5em;
  }
  .savegisttoken {
    margin-left: 5px;
  }
  .aPlugin {
    display: inline-block;
    padding-left: 10px;
    padding-top: 4px;
    padding-bottom: 6px;
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;
  }
  .pluginLoad {
    vertical-align: top;
    max-height: inherit;
    margin: 2px;

  }
  .removePlugin{
    padding-left: 7px;
    padding-right: 7px;
    border-left: 2px solid ${styles.appProperties.primary_BackgroundColor};
    margin-left: 10px;
  }
`
