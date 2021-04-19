export class Page {
    constructor(params) {
        this.params = params
    }

    getRoot() {
        throw new Error('Method "getRoot" should be implementer')
        // eslint-disable-next-line no-unreachable
        return ''
    }
    // hook
    afterRender() {

    }

    destroy() {

    }
}