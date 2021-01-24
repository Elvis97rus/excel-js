import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(20)
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            // console.log($resizer.$el.dataset.resize, coords)

            const colIndex = $parent.data.index
            const rows = colIndex ? document.querySelectorAll(
                '[data-row-data="cells"] div:nth-child(' + colIndex + ')'
            ) : ''
            if (colIndex) {
                rows.forEach((cell) => {
                    cell.style.borderRight = 2 + 'px solid #3c74ff'
                })
            }

            document.onmousemove = e => {
                $resizer.$el.style.opacity = 1

                if ($resizer.$el.dataset.resize === 'col') {
                    const delta = Math.floor(e.pageX - coords.right)
                    this.width = coords.width + delta
                    $parent.$el.style.width = this.width + 'px'
                    $parent.$el.style.borderRight = 1 + 'px solid #3c74ff'
                }

                if ($resizer.$el.dataset.resize === 'row') {
                    const delta = Math.floor(e.pageY - coords.bottom)
                    const height = coords.height + delta
                    $parent.$el.style.height = height + 'px'
                    $parent.$el.style.borderBottom = 2 + 'px solid #3c74ff'
                }
            }

            document.onmouseup = () => {
                $resizer.$el.style.opacity = ''
                $parent.$el.style.borderRight = ''
                $parent.$el.style.borderBottom = ''
                if (colIndex) {
                    rows.forEach((cell) => {
                        cell.style.width = this.width + 'px'
                        cell.style.borderRight = ''
                    })
                }

                document.onmousemove = null
            }
        }
    }
}