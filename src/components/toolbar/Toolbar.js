import {$} from '@core/dom'
import {createToolbar} from '@/components/toolbar/toolbar.template'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'
  constructor($root, options = {}) {
    options.name = 'Toolbar'
    options.listeners = ['click']
    options.subscribe = ['currentStyles']
    super($root, options)
  }
  prepare() {
    this.initState(defaultStyles)
  }
  get template() {
    return createToolbar(this.state)
  }
  toHTML() {
    return this.template
  }
  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }
  onClick(event) {
    const $target = $(event.target)
    const isButton = $target.data.type === 'button-toolbar'
    let $button
    if (!isButton) {
      $button = $target.closest('[data-type="button-toolbar"]')
    } else {
      $button = $target
    }
    if (isButton || $button) {
      const value = JSON.parse($button.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
