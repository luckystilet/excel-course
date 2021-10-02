export function keyHandler(event, Table) {
  const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
  const {key} = event
  if (!((keys.includes(key)) && !event.shiftKey)) return
  event.preventDefault()
  const idObjCurrent = Table.selection.idObjCurrent
  const $next = Table.$root.$find(nextSelector(key, idObjCurrent))
  Table.selection.select($next)
  Table.$emit('table:select', $next.text)
}
function nextSelector(key, {row, col}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col--
      if (col < 1) col = 1
      break
    case 'ArrowUp':
      row--
      if (row < 1) row = 1
      break
  }
  return `[data-id="${row}:${col}"]`
}
