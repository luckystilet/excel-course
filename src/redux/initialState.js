import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  title: defaultTitle,
  currentText: '',
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

const localStorageState = normalize(storage('excel-state'))
export const initialState = storage('excel-state') ? localStorageState : defaultState
