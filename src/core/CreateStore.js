import {rootReducer} from '@/redux/rootReducer';

export class CreateStore {
    constructor(rootReducer, initialState = {}) {
        this.state = rootReducer({...initialState}, {type: '__INIT__'})
        this.listeners = []
    }

    subscribe(fn) {
        this.listeners.push(fn)
        return {
            unsubscribe() {
                this.listeners = this.listeners.filter(l => l !== fn)
            }
        }
    }

    dispatch(action) {
        this.state = rootReducer(this.state, action)
        this.listeners.forEach(listener => listener(this.state))
    }

    getState() {
        return JSON.parse(JSON.stringify(this.state))
    }
}