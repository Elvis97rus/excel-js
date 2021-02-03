import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unSubscribers = []

        this.prepare()
    }

    /*
    * Component regulation before init()
    * */
    prepare() {

    }

    /*
    * Render component tpl
    * */
    toHTML() {
        return ''
    }

    /*
    * notify listeners about "event" event
    * */
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    /*
    * subscribe on "event" event
    * */
    $on(event, fn) {
        const unSub = this.emitter.subscribe(event, fn)
        this.unSubscribers.push(unSub)
    }

    /*
    * initialize; add DomListeners
    * */
    init() {
        this.initDOMListeners()
    }

    /*
    * remove Component; clear DomListeners
    * */
    destroy() {
        this.removeDOMListeners()
        this.unSubscribers.forEach(unSub => unSub())
    }
}