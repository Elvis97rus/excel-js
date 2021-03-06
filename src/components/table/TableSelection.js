export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }

    // $el - instanceof DOM === true
    selectSingle($el) {
        this.reset()
        this.group.push($el)
        $el.focus().addClass(TableSelection.className)
        this.current = $el
    }

    selectPlural($elements = []) {
        this.reset()
        this.group = $elements
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }

    reset() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}