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
    openedDate: new Date().toLocaleDateString()
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
    openedDate: new Date().toLocaleDateString()
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}