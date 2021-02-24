const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = '120'
const DEFAULT_HEIGHT = '24'

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px;'
}
function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT ) + 'px;'
}

function toCell(state, row) {
    return function(_, col) {
        const width = getWidth(state, col+1)
        return `
            <div class="cell" contenteditable 
            data-col="${col + 1}" 
            data-type="cell" 
            data-id="${row}:${col+1}"
            style="width:${width}"
            >
                ${_}
            </div>
        `
    }
}

function toColumn({col, index, width}) {
    return `
        <div 
            class="column" 
            data-type="resizable" 
            data-index="${index+1}" 
            style="width:${width}"
            >
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index = 0, content, state) {
    const resize = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : ''
    const dataCells = index
        ? 'data-row-data="cells"'
        : ''
    const height = getHeight(state, index)

    return `
         <div 
         class="row" 
         data-type="resizable" 
         data-row="${index}"
         style="height: ${height};">
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

function widthWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index+1)
        }
    }
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(widthWidthFrom(state))
        .map(toColumn)
        .join('')
   rows.push(createRow('', cols, {}))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state.colState, row+1))
            .join('')
        rows.push(createRow(row+1, cells, state.rowState))
    }

    return rows.join('')
}