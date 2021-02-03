import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resize} from '@/components/table/table.resize';
import {
    isCell, matrix, nextSelector, shouldResize
} from '@/components/table/table.functions';
import {$} from '@core/dom';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'keydown']
        })
        this.tableSelection = new TableSelection()
        this.rowsCount = 20
    }

    toHTML() {
        return createTable(this.rowsCount)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        const $cell = this.$root.find('[data-id="1:1"]')
        this.selection.selectSingle($cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resize(event, this)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))

                this.selection.selectPlural($cells)
            } else {
                this.selection.selectSingle($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter', 'Tab',
            'ArrowLeft', 'ArrowRight',
            'ArrowUp', 'ArrowDown'
        ]

        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const current = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, current))
            this.selection.selectSingle($next)
        }
    }
}