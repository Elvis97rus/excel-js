function toButton(button) {
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'
    `
    return `<div 
            class="button ${button.active ? 'active' : ''}"
            ${meta}
            >
                <i 
                class="material-icons"
                ${meta}
                >${button.icon}</i>
            </div>`
}

export function createToolbar(state) {
    const buttons = [
        {
            icon: 'format_align_left',
            active: state['textAlign'] === 'left',
            value: {
                textAlign: state['textAlign'] === 'left' ? 'none' : 'left'
            }
        },
        {
            icon: 'format_align_center',
            active: state['textAlign'] === 'center',
            value: {
                textAlign: state['textAlign'] === 'center' ? 'none' : 'center'
            }
        },
        {
            icon: 'format_align_right',
            active: state['textAlign'] === 'right',
            value: {
                textAlign: state['textAlign'] === 'right' ? 'none' : 'right'
            }
        },
        {
            icon: 'format_bold',
            active: state['fontWeight'] === 'bold',
            value: {
                fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'
            }
        },
        {
            icon: 'format_italic',
            active: state['fontStyle'] === 'normal',
            value: { fontStyle: state['fontStyle'] === 'italic'
                    ? 'normal' : 'italic'
            }
        },
        {
            icon: 'format_underlined',
            active: state['textDecoration'] === 'none',
            value: { textDecoration: state['textDecoration'] === 'underlined'
                    ? 'none' : 'underlined'
            }
        },
    ]
    return buttons.map(toButton).join('')
}