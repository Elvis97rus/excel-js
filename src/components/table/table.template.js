const CODES = {
    A: 65,
    Z: 90
}

function toCell(row) {
    return function(_, col) {
        return `
            <div class="cell" contenteditable 
            data-col="${col + 1}" 
            data-type="cell" 
            data-id="${row}:${col+1}">
                ${_}
            </div>
        `
    }
}

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-index="${index+1}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index = 0, content) {
    const resize = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : ''
    const dataCells = index
        ? 'data-row-data="cells"'
        : ''

    return `
         <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data" ${dataCells}>${content}</div>
        </div>   
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')
   rows.push(createRow('', cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row+1))
            .join('')
        rows.push(createRow(row+1, cells))
    }

    return rows.join('')
}