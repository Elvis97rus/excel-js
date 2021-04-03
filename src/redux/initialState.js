// import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';
import {clone} from '@core/utils';

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    dateCreated: new Date().toLocaleDateString(),
    lastUpdated: new Date().toLocaleDateString()
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
    lastUpdated: new Date().toLocaleDateString()
})
//
// export const initialState = storage('excel-state')
//     ? normalize(storage('excel-state'))
//     : defaultState

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}