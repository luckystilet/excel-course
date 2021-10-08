import {$} from '@core/dom'

export function tableResize($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const resizeType = $resizer.data.resize
    const isCol = resizeType === 'col'
    let colNumber
    let $cells
    let delta
    if (isCol) {
      colNumber = $parent.data.col
      $cells = $root.findAll(`[data-col="${colNumber}"]`)
    }
    const getResizerHeight = () => {
      const tableHeight = $root.getCoords().height
      const rowHeight = $root.find('.row').getCoords().height
      return rowHeight - tableHeight + 15
    }
    const getResizerWidth = () => {
      const tableWidth = $root.getCoords().width
      const rowWidth = $root.find('.row .row-info').getCoords().width
      return rowWidth - tableWidth
    }
    if (isCol) {
      $resizer.css({
        opacity: 1,
        bottom: getResizerHeight()
      })
    } else {
      $resizer.css({
        opacity: 1,
        right: getResizerWidth()
      })
    }
    document.onmousemove = e => {
      if (isCol) {
        delta = e.pageX - coords.right - window.scrollX
        $resizer.css({right: -delta})
      } else {
        delta = e.pageY - coords.bottom - window.scrollY
        $resizer.css({bottom: -delta})
      }
    }
    document.onmouseup = (e) => {
      document.onmousemove = null
      document.onmouseup = null
      let value
      if (isCol) {
        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: -2
        })
        value = coords.width + delta
        $parent.css({width: value})
        $cells.css({width: value})
      } else {
        $resizer.css({
          opacity: 0,
          right: 0,
          bottom: -2
        })
        value = coords.height + delta
        $parent.css({height: value})
      }
      resolve({
        id: isCol ? $parent.data.col : $parent.data.row,
        value,
        type: resizeType
      })
    }
  })
}
