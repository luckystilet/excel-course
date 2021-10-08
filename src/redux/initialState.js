import {storage} from '@core/utils'

const defaultState = {
  currentText: '',
  rowState: {},
  colState: {},
  dataState: {}
}
const localStorageState = storage('excel-state')
export const initialState = localStorageState ? localStorageState : defaultState
