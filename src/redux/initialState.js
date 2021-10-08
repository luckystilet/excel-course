import {storage} from '@core/utils'
import {defaultStyles} from '@/constants'

const defaultState = {
  currentText: '',
  rowState: {},
  colState: {},
  dataState: {},
  currentStyles: defaultStyles
}
const localStorageState = storage('excel-state')
export const initialState = localStorageState ? localStorageState : defaultState
