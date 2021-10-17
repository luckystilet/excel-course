import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {debounce} from '@core/utils'
import {defaultTitle} from '@/constants'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options = {}) {
    options.name = 'Header'
    options.listeners = ['input']
    super($root, options)
  }
  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }
  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input class="input" type="text" value="${title}"/>
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `
  }
  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text))
  }
}
