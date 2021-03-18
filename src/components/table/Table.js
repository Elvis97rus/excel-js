import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resize} from '@/components/table/table.resize';
import {
    isCell, matrix, nextSelector, shouldResize
} from '@/components/table/table.functions';
import {$} from '@core/dom';
import {TableSelection} from '@/components/table/TableSelection';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })

        this.tableSelection = new TableSelection()
        this.rowsCount = 20
    }

    toHTML() {
        return createTable(this.rowsCount, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        const $cell = this.$root.find('[data-id="1:1"]')

        this.selectSell($cell)

        this.$on('formula:onInput', text => {
            this.selection.current.text(text)
            this.updateTextInStore(text)
        })
        this.$on('formula:onEnter', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:applyStyle', style => {
            console.log(style)
            this.selection.applyStyle(style)
        })
    }

    selectSell($cell) {
        this.selection.selectSingle($cell)
        this.$emit('table:select', $cell)

        console.log($cell.getStyles(Object.keys(defaultStyles)))
    }

    async resizeTable(event) {
        try {
            const data = await resize(event, this)
            this.$dispatch(actions.tableResize(data))
            // console.log('Resize data: ', data)
        } catch (e) {
            console.warn('Resize err: ', e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))

                this.selection.selectPlural($cells)
            } else {
                this.selectSell($target)
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

            this.selectSell($next)
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        // this.$emit('table:input', $(event.target))
        this.updateTextInStore($(event.target).text())
    }
}