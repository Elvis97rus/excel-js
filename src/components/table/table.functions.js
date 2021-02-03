import {range} from '@core/utils';

/*
 * Check if dataset includes col/row meta
 * */
export function shouldResize(event) {
    return event.target.dataset.resize
}

/*
 * Check if target is Cell
 * */
export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

/*
* Generates an Array of cells filled by id's ['row:col', ...]
* */
export function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)

    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

/*
* Change id of cell to select, based on keyPressed code
* */
export function nextSelector(key, {col, row}, rowCount = 20) {
    const MIN_VAL = 1
    const MAX_VAL = 26
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row < 20 ? row++ : row
            break
        case 'Tab':
        case 'ArrowRight':
            col < MAX_VAL ? col++ : col
            break
        case 'ArrowLeft':
            col > MIN_VAL ? col-- : col
            break
        case 'ArrowUp':
            row > MIN_VAL ? row-- : row
            break
    }
    return `[data-id="${row}:${col}"]`
}