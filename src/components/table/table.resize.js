import {$} from '@core/dom';

export function resize(event, object) {
     return new Promise(resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const type = $resizer.data.resize
        const sideProp = type === 'col' ? 'bottom' : 'right'
        let width
        let height
       // let value

        const colIndex = $parent.data.index
        const rows = colIndex ? object.$root.findAll(
            '[data-row-data="cells"] div:nth-child(' + colIndex + ')'
        ) : ''

        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        })

        document.onmousemove = e => {
            if (type === 'col') {
                const delta = Math.floor(e.pageX - coords.right)
                width = coords.width + delta
                $resizer.css({
                    right: -delta + 'px',
                })
            } else {
                const delta = Math.floor(e.pageY - coords.bottom)
                height = coords.height + delta
                $resizer.css({
                    bottom: -delta + 'px',
                })
            }
        }

        document.onmouseup = () => {
            $resizer.css({
                opacity: ''
            })

            if (colIndex) {
                $parent.css({
                    width: width + 'px'
                })
                rows.forEach((cell) => {
                    cell.style.width = width + 'px'
                })
            } else {
                $parent.css({
                    height: height + 'px'
                })
            }

             resolve({
                width,
                id: type === 'col' ? $parent.data.index : null
            })

            $resizer.css({
                right: '',
                bottom: ''
            })

            document.onmousup = null
            document.onmousemove = null
        }
    })
}
