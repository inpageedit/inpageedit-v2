/**
 * @module Progress 载入中模块
 * @method this.setTitle
 * @method this.setStatus
 * @method this.done
 * @method this.close
 */

const { _msg } = require('./_msg')
const { $progress } = require('./_elements.js')
const sleep = require('../util/sleep')

class Progress {
  /**
   * @constructor
   * @param {String} title
   */
  constructor(title) {
    this.title = title || 'Loading...'
    this.getThis = () => this

    // 处理模态框
    this.modal = ssi_modal.createObject({})

    // 选项
    this.modal.setOptions('center', true)
    this.modal.setOptions('className', 'in-page-edit ipe-progress')
    this.modal.setOptions('outSideClose', false)
    // this.modal.setOptions()
    this.modal.init()

    // 内容
    this.$progress = $($progress)
    this.modal.setTitle(title)
    this.modal.setContent($progress)

    this.modal.show()
  }

  setTitle(title) {
    this.modal.setTitle(title)
  }
  setStatus(status) {
    const self = this.getThis()
    if (status) {
      self.$progress.addClass('done')
    } else {
      self.$progress.removeClass('done')
    }
  }
  async done(msg, delay) {
    const self = this.getThis()
    this.setStatus(true)
    this.setTitle(msg || _msg('done'))
    if (delay) {
      await sleep(delay)
      self.close()
    }
  }
  close() {
    this.modal.close()
  }
}

module.exports = {
  Progress,
}
