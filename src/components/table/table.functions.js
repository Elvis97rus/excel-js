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