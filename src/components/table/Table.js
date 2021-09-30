import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {tableResize} from '@/components/table/table.resize'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }
  toHTML() {
    return createTable()
  }
  onMousedown(event) {
    if (!event.target.dataset.resize) return
    tableResize(this.$root, event)
  }
}
