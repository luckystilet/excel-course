import {$} from '@core/dom'
import {createToolbar} from '@/components/toolbar/toolbar.template'
import {ExcelStateComponent} from '@core/ExcelStateComponent'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'
  constructor($root, options = {}) {
    options.name = 'Toolbar'
    options.listeners = ['click']
    super($root, options)
  }
  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal'
    }
    this.initState(initialState)
  }
  get template() {
    return createToolbar(this.state)
  }
  toHTML() {
    return this.template
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
  
      const key = Object.keys(value)[0]
      this.setState({[key]: value[key]})
    }
  }
}
