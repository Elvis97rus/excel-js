import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            // listeners: ['click', 'mousedown', 'mouseup', 'mousemove']
        })
    }

    toHTML() {
        return createTable(20)
    }

    // onClick() {
    //     console.log('click')
    // }
    //
    // onMousedown() {
    //     console.log('down');
    // }
    // onMouseup() {
    //     console.log('up');
    // }
    //
    // onMousemove() {
    //     console.log('move');
    // }
}