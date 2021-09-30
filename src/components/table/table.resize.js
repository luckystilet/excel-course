import {$} from '@core/dom'

export function tableResize($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const resizeType = $resizer.data.resize
  const isCol = resizeType === 'col'
  let colNumber
  let cells
  let delta
  if (isCol) {
    colNumber = $parent.data.col
    cells = $root.findAll(`[data-col="${colNumber}"]`)
  }
  const getResizerHeight = () => {
    const tableHeight = $root.getCoords().height
    const rowHeight = $root.$find('.row').getCoords().height
    return rowHeight - tableHeight + 15
  }
  const getResizerWidth = () => {
    const tableWidth = $root.getCoords().width
    const rowWidth = $root.$find('.row .row-info').getCoords().width
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
    console.log('onmousemove')
    if (isCol) {
      delta = e.pageX - coords.right
      $resizer.css({right: -delta})
    } else {
      delta = e.pageY - coords.bottom
      $resizer.css({bottom: -delta})
      // const value = coords.height + delta
      // $parent.css({height: value})
    }
  }
  document.onmouseup = (e) => {
    console.log('onmouseup')
    document.onmousemove = null
    document.onmouseup = null
    if (isCol) {
      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: -2
      })
      const value = coords.width + delta
      $parent.css({width: value})
      cells.forEach($item => $item.style.width = value + 'px')
    } else {
      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: -2
      })
      const value = coords.height + delta
      $parent.css({height: value})
    }
  }
}
