export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }
  select($el) {
    this.clear()
    this.group.push($el)
    $el.focus().addClass(TableSelection.className)
    this.current = $el
  }
  get idObjCurrent() {
    return this.parse(this.current.data.id)
  }
  selectGroup($el, $root) {
    const idObjCurrent = this.idObjCurrent
    const idObjTarget = this.parse($el.data.id)
    const idObjTopLeft = {
      row: Math.min(idObjCurrent.row, idObjTarget.row),
      col: Math.min(idObjCurrent.col, idObjTarget.col)
    }
    const length = {
      rows: Math.abs(idObjTarget.row - idObjCurrent.row) + 1,
      cols: Math.abs(idObjTarget.col - idObjCurrent.col) + 1
    }
    let queryStr = ''
    for (let row = 0; row < length.rows; row++) {
      for (let col = 0; col < length.cols; col++) {
        if (queryStr) queryStr += ', '
        queryStr += `[data-id="${idObjTopLeft.row + row}:${idObjTopLeft.col + col}"]`
      }
    }
    const $cells = $root.$findAll(queryStr)
    this.group = $cells
    $cells.addClass(TableSelection.className)
  }
  clear() {
    this.group.forEach($item => $item.removeClass(TableSelection.className))
    this.group = []
  }
  parse(stringId) {
    const arrIds = stringId.split(':')
    return {
      row: + arrIds[0],
      col: + arrIds[1]
    }
  }
}
