function toHTML() {
    return `
     <li class="db__record">
        <a href="#">Table № 1</a>
        <strong>18.01.2021</strong>
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