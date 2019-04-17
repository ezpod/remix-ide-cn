'use strict'
var DropdownPanel = require('./DropdownPanel')
var yo = require('yo-yo')

function StoragePanel (_parent, _traceManager) {
  this.basicPanel = new DropdownPanel('存储 ', {json: true})
}

StoragePanel.prototype.update = function (storage, header) {
  this.basicPanel.update(storage, header)
}

StoragePanel.prototype.render = function () {
  return yo`<div id='storagepanel' >${this.basicPanel.render()}</div>`
}

module.exports = StoragePanel
