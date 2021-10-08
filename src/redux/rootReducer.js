import {CHANGE_TEXT, TABLE_RESIZE} from './types'

export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case TABLE_RESIZE:
      const field = action.data.type === 'col' ? 'colState' : 'rowState'
      const localStateCol = state[field] || {}
      localStateCol[action.data.id] = action.data.value
      return {...state, [field]: localStateCol}
    case CHANGE_TEXT:
      prevState = state.dataState
      prevState[action.data.id] = action.data.value
      return {
        ...state,
        currentText: action.data.value,
        dataState: prevState
      }
    default: return state
  }
}
