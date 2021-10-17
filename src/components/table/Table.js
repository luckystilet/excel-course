import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {tableResize} from '@/components/table/table.resize'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import {keyHandler} from '@/components/table/table.keyHandler'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options = {}) {
    options.name = 'Table'
    options.listeners = ['mousedown', 'keydown', 'input']
    super($root, options)
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    const $cell = this.$root.find('[data-id="1:1"]')
    this.changeCell($cell)
    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text = parse(value)
      // this.selection.current.text = value
      this.updateInStore(value)
    })
    this.$on('formula:enter', () => this.selection.current.focus())
    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style)
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIds
      }))
    })
  }
  toHTML() {
    return createTable(10, this.store.getState())
  }
  async tableResizeWrapper(event) {
    try {
      const data = await tableResize(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn(e.message)
    }
  }
  get cellId() {
    return this.selection.current.data.id
  }
  changeCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const cellStyles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(cellStyles))
  }
  updateInStore(text) {
    this.$dispatch(actions.changeText({
      id: this.cellId,
      value: text
    }))
  }
  onMousedown(event) {
    const $target = $(event.target)
    if ($target.data.resize) {
      this.tableResizeWrapper(event)
    } else if ($target.data.type === 'cell') {
      if (event.shiftKey) {
        this.selection.selectGroup($(event.target), this.$root)
        // this.$emit('table:select', '')
      } else {
        this.changeCell($target)
      }
    }
  }
  onKeydown(event) {
    keyHandler(event, this)
  }
  onInput(event) {
    // this.$emit('table:input', $(event.target).text)
    this.updateInStore($(event.target).text)
  }
}
