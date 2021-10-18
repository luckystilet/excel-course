import {clone, storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  title: defaultTitle,
  currentText: '',
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
