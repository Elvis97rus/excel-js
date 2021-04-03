import {storage} from '@core/utils';

function toHTML(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    return `
     <li class="db__record">
        <a href="#excel/${id}">${model.title}</a>
        <strong>${model.dateCreated}</strong>
    </li>
    `
}
// excel: 1123
// excel: 1124
function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function getAllRecords() {

}

export function createRecordsTable() {
    const keys = getAllKeys()
    console.log(keys)
    if (!keys.length) {
        return `<p>Please create your first table!</p>`
    }

    return `
        <div class="db__list-header">
            <span>Name</span>
            <span>Creation date</span>
        </div>

        <ul class="db__list">
           ${ keys.map(toHTML).join('') }
        </ul>
    `
}