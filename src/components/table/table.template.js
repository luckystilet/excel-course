// const CODES = {
//   A: 65,
//   Z: 90
// }
const CODES = {
  A: 65,
  Z: 75
}

function createCell(cellContent, colIndex, rowIndex, style) {
  return `
    <div
      class="cell"
      spellcheck="false"
      data-type="cell"
      data-col="${colIndex}"
      data-id="${rowIndex}:${colIndex}"
      contenteditable
      ${style}
    >${cellContent}</div>
  `
}

function createCol(colContent, coldIndex, width) {
  coldIndex++
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${coldIndex}"
      ${width ? `style="width: ${width}"` : ''}
    >
      ${colContent}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, rowNumber = '', rowStyle = '') {
  const resizer = rowNumber ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div
      class="row"
      data-type="resizable"
      data-row="${rowNumber}"
      ${rowStyle}
    >
      <div class="row-info">
        ${rowNumber}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function getWidth({colState = {}}, index) {
  return colState[index] ? colState[index] + 'px' : null
}

function getCellStyle({rowState = {}, colState = {}}, colIndex, rowIndex) {
  const heightStr = rowState[rowIndex] ? 'height: ' + rowState[rowIndex] + 'px; ' : ''
  const widthStr = colState[colIndex] ? 'width: ' + colState[colIndex] + 'px; ' : ''
  if (heightStr || widthStr) {
    return `style="${heightStr}${widthStr}`.trim() + '"'
  }
  return ''
}

function getRowStyle({rowState = {}}, rowIndex) {
  const heightStr = rowState[rowIndex] ? 'height: ' + rowState[rowIndex] + 'px;' : ''
  if (heightStr) {
    return `style="${heightStr}"`
  }
  return ''
}

export function createTable(rowsCount = 15, state) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  // table header
  const cols = new Array(colsCount)
      .fill('')
      .map((el, index) => {
        const letter = String.fromCharCode(CODES.A + index)
        const width = getWidth(state, index + 1)
        return createCol(letter, index, width)
      })
      .join('')
  rows.push(createRow(cols))
  // table body
  for (let i = 1; i < rowsCount + 1; i++) {
    const columnsContent = []
    for (let colIndex = 1; colIndex <= colsCount; colIndex++) {
      const rowIndex = i
      const style = getCellStyle(state, colIndex, rowIndex)
      const colContent = state.dataState[`${rowIndex}:${colIndex}`] || ''
      columnsContent.push(createCell(colContent, colIndex, rowIndex, style))
    }
    rows.push(createRow(columnsContent.join(''), i, getRowStyle(state, i)))
  }
  return rows.join('')
}

