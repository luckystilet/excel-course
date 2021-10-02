const CODES = {
  A: 65,
  Z: 90
}
// const CODES = {
//   A: 65,
//   Z: 75
// }


function createCell(cellContent, colIndex, rowIndex) {
  colIndex++
  return `
    <div
      class="cell"
      spellcheck="false"
      data-type="cell"
      data-col="${colIndex}"
      data-id="${rowIndex}:${colIndex}"
      contenteditable
    >${cellContent}</div>
  `
}

function createCol(colContent, coldIndex) {
  coldIndex++
  return `
    <div class="column" data-type="resizable" data-col="${coldIndex}">
      ${colContent}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, rowNumber = '') {
  const resizer = rowNumber ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${rowNumber}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  // table header
  const cols = new Array(colsCount)
      .fill('')
      .map((el, index) => {
        const letter = String.fromCharCode(CODES.A + index)
        return createCol(letter, index)
      })
      .join('')
  rows.push(createRow(cols))
  // table body
  for (let i = 0; i < rowsCount; i++) {
    const columnsContent = []
    for (let j = 0; j < colsCount - 1; j++) {
      columnsContent.push(createCell('', j, i + 1))
    }
    rows.push(createRow(columnsContent.join(''), i + 1))
  }
  return rows.join('')
}

