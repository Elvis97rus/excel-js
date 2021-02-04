export class Emitter {
    constructor() {
        this.listeners = {}
    }

    /*
    * Notify listener if exists
    * table.emit('table:select', {a: 1})
    * */
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    /*
    * Subscribe on notify / add new listener
    * formula.subscribe('table:select', ()=>{})
    * */
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}


/*
* Use Example
* */
// const emitter = new Emitter()
// const unSubscribe = emitter.subscribe(
//     'testEvent',
//        data => console.log('-> ', data)
// )
// emitter.emit('testEvent', {55: 'test'})
//
// setTimeout(()=>{
//     emitter.emit('testEvent', 55)
// }, 2000)
//
// setTimeout(()=>{
//     unSubscribe()
// }, 3000)
//
// setTimeout(()=>{
//     emitter.emit('testEvent', 55)
// }, 4000)
