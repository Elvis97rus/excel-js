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
            const type = $resizer.data.resize

            const colIndex = $parent.data.index
            const rows = colIndex ? this.$root.findAll(
                '[data-row-data="cells"] div:nth-child(' + colIndex + ')'
            ) : ''

            if (colIndex) {
                rows.forEach((cell) => {
                    cell.style.borderRight = 2 + 'px solid #3c74ff'
                })
            }

            document.onmousemove = e => {
                $resizer.css({
                    opacity: 1
                })

                if (type === 'col') {
                    const delta = Math.floor(e.pageX - coords.right)
                    this.width = coords.width + delta
                    $resizer.css({
                        right: -delta + 'px'
                    })
                } else {
                    const delta = Math.floor(e.pageY - coords.bottom)
                    this.height = coords.height + delta
                    $parent.css({
                        borderBottom: 2 + 'px solid #3c74ff'
                    })
                    $resizer.css({
                        bottom: -delta + 'px'
                    })
                }
            }

            document.onmouseup = () => {
                $resizer.css({
                    opacity: ''
                })

                $parent.css({
                    borderRight: '',
                    borderBottom: ''
                })
                if (colIndex) {
                    $parent.css({
                        width: this.width + 'px'
                    })
                    rows.forEach((cell) => {
                        cell.style.width = this.width + 'px'
                        cell.style.borderRight = ''
                    })
                } else {
                    $parent.css({
                        height: this.height + 'px'
                    })
                }

                $resizer.css({
                    right: '',
                    bottom: ''
                })

                document.onmousemove = null
            }
        }
    }
}