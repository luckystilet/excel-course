import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {keyHandler} from '@/components/formula/formula.keyHandler'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options = {}) {
    options.name = 'Formula'
    options.listeners = ['input', 'keydown']
    super($root, options)
  }
  init() {
    super.init()
    this.$formula = this.$root.$find('#formula')
    this.$on('table:select', text => this.$formula.text = text)
    this.$on('table:input', text => this.$formula.text = text)
  }
  toHTML() {
    return `
      <div class="info">fx</div>
      <div
        class="input"
        id="formula"
        contenteditable="true"
        spellcheck="false"
      ></div>
    `
  }
  onInput(event) {
    this.$emit('formula:input', $(event.target).text)
  }
  onKeydown(event) {
    keyHandler(event, this)
  }
}
