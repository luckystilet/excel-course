class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  clear() {
    this.html('')
    return this
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  get data() {
    return this.$el.dataset
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  find(selector) {
    return this.$el.querySelector(selector)
  }
  $find(selector) {
    return $(this.$el.querySelector(selector))
  }
  $findAll(selector) {
    return $(this.$el.querySelectorAll(selector))
  }
  css(styles = {}) {
    function addPxForNumbers(style, value) {
      let resultValue = ('' + value).trim()
      const charCodeLastSymbol = resultValue.charCodeAt(resultValue.length - 1)
      const isDimensional = style !== 'lineHeight' && style !== 'opacity'
      const isNumberCharCodeLastSymbol = charCodeLastSymbol > 47 && charCodeLastSymbol < 58
      if (isNumberCharCodeLastSymbol && isDimensional) {
        resultValue += 'px'
      }
      return resultValue
    }
    for (const [style, value] of Object.entries(styles)) {
      this.$el.style[style] = addPxForNumbers(style, value)
    }
    return this
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
}

export function $(selector) {
  return new Dom(selector)
}
$.create = (tagName, classes = '') => {
  const el = document.createElement('div')
  if (classes) el.className = classes
  return $(el)
}
