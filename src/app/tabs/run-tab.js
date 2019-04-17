var yo = require('yo-yo')
var EventManager = require('../../lib/events')
var Card = require('../ui/card')
var css = require('./styles/run-tab-styles')

var Settings = require('./runTab/model/settings.js')
var SettingsUI = require('./runTab/settings.js')

var DropdownLogic = require('./runTab/model/dropdownlogic.js')
var ContractDropdownUI = require('./runTab/contractDropdown.js')

var Recorder = require('./runTab/model/recorder.js')
var RecorderUI = require('./runTab/recorder.js')

class RunTab {

  constructor (udapp, udappUI, config, fileManager, editor, logCallback, filePanel, pluginManager, compilersArtefacts) {
    this.event = new EventManager()

    this.renderInstanceContainer()
    this.renderSettings(udapp)
    this.renderDropdown(udappUI, fileManager, pluginManager, compilersArtefacts, config, editor, udapp, filePanel, logCallback)
    this.renderRecorder(udapp, udappUI, fileManager, config, logCallback)
    this.renderRecorderCard()
    this.renderContainer()
  }

  renderContainer () {
    this.container = yo`<div class="${css.runTabView}" id="runTabView" ></div>`

    var el = yo`
    <div>
      ${this.settingsUI.render()}
      ${this.contractDropdownUI.render()}
      ${this.recorderCard.render()}
      ${this.instanceContainer}
    </div>
    `
    this.container.appendChild(el)
  }

  renderInstanceContainer () {
    this.instanceContainer = yo`<div class="${css.instanceContainer}"></div>`

    const instanceContainerTitle = yo`
      <div class=${css.instanceContainerTitle}
        title="为已部署的合约自动生成的通用交互界面">
        已部署的合约
        <i class="${css.clearinstance} ${css.icon} fa fa-trash" onclick=${() => this.event.trigger('clearInstance', [])}
          title="清理合约示例列表，重置交易记录器" aria-hidden="true">
        </i>
      </div>`

    this.noInstancesText = yo`
      <div class="${css.noInstancesText}">
        目前没有可以交互的合约实例。
      </div>`

    this.event.register('clearInstance', () => {
      this.instanceContainer.innerHTML = '' // clear the instances list
      this.instanceContainer.appendChild(instanceContainerTitle)
      this.instanceContainer.appendChild(this.noInstancesText)
    })

    this.instanceContainer.appendChild(instanceContainerTitle)
    this.instanceContainer.appendChild(this.noInstancesText)
  }

  renderSettings (udapp) {
    var settings = new Settings(udapp)
    this.settingsUI = new SettingsUI(settings)

    this.settingsUI.event.register('clearInstance', () => {
      this.event.trigger('clearInstance', [])
    })
  }

  renderDropdown (udappUI, fileManager, pluginManager, compilersArtefacts, config, editor, udapp, filePanel, logCallback) {
    var dropdownLogic = new DropdownLogic(fileManager, pluginManager, compilersArtefacts, config, editor, udapp, filePanel)
    this.contractDropdownUI = new ContractDropdownUI(dropdownLogic, logCallback)

    this.contractDropdownUI.event.register('clearInstance', () => {
      var noInstancesText = this.noInstancesText
      if (noInstancesText.parentNode) { noInstancesText.parentNode.removeChild(noInstancesText) }
    })
    this.contractDropdownUI.event.register('newContractABIAdded', (abi, address) => {
      this.instanceContainer.appendChild(udappUI.renderInstanceFromABI(abi, address, address))
    })
    this.contractDropdownUI.event.register('newContractInstanceAdded', (contractObject, address, value) => {
      this.instanceContainer.appendChild(udappUI.renderInstance(contractObject, address, value))
    })
  }

  renderRecorder (udapp, udappUI, fileManager, config, logCallback) {
    this.recorderCount = yo`<span>0</span>`

    var recorder = new Recorder(udapp, fileManager, config)
    recorder.event.register('recorderCountChange', (count) => {
      this.recorderCount.innerText = count
    })
    this.event.register('clearInstance', recorder.clearAll.bind(recorder))

    this.recorderInterface = new RecorderUI(recorder, logCallback)

    this.recorderInterface.event.register('newScenario', (abi, address, contractName) => {
      var noInstancesText = this.noInstancesText
      if (noInstancesText.parentNode) { noInstancesText.parentNode.removeChild(noInstancesText) }
      this.instanceContainer.appendChild(udappUI.renderInstanceFromABI(abi, address, contractName))
    })

    this.recorderInterface.render()
  }

  renderRecorderCard () {
    const collapsedView = yo`
      <div class=${css.recorderCollapsedView}>
        <div class=${css.recorderCount}>${this.recorderCount}</div>
      </div>`

    const expandedView = yo`
      <div class=${css.recorderExpandedView}>
        <div class=${css.recorderDescription}>
          在这个环境中的所有交易（合约部署交易以及合约方法执行交易）都可以保存并在
          另一个环境中重放。例如，在JS VM环境中创建的交易，可以在Injected Web3环境中重放。
        </div>
        <div class="${css.transactionActions}">
          ${this.recorderInterface.recordButton}
          ${this.recorderInterface.runButton}
          </div>
        </div>
      </div>`

    this.recorderCard = new Card({}, {}, { title: '已记录的交易:', collapsedView: collapsedView })
    this.recorderCard.event.register('expandCollapseCard', (arrow, body, status) => {
      body.innerHTML = ''
      status.innerHTML = ''
      if (arrow === 'down') {
        status.appendChild(collapsedView)
        body.appendChild(expandedView)
      } else if (arrow === 'up') {
        status.appendChild(collapsedView)
      }
    })
  }

  render () {
    return this.container
  }
}

module.exports = RunTab
