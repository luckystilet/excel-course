import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE} from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(text) {
  return {
    type: CHANGE_TEXT,
    data: text
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}
