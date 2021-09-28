const CODES = {
  A: 65,
  Z: 90
}


function createCell(cell) {
  return `
    <div class="cell" contenteditable spellcheck="false">${cell}</div>
  `
}

function createCol(col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow(content, rowNumber = '') {
  return `
    <div class="row">
      <div class="row-info">${rowNumber}</div>
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
        return createCol(letter)
      })
      .join('')
  rows.push(createRow(cols))
  // table body
  for (let i = 0; i < rowsCount; i++) {
    const columnsContent = []
    for (let j = 0; j < colsCount - 1; j++) {
      columnsContent.push(createCell('' + i + j))
    }
    rows.push(createRow(columnsContent.join(''), i + 1))
  }
  return rows.join('')
}

