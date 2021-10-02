class Dom {
  constructor(selector) {
    if (selector === null) {
      throw new Error('"selector" for class Dom - should be provided')
    }
    this.$el = typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : selector
    this.#pretty$el()
  }
  #pretty$el() {
    if (this.$el.nodeType !== Node.ELEMENT_NODE) {
      if (this.$el.length === 1) {
        this.$el = this.$el[0]
        this.isList = false
      } else if (this.$el.length === 0) {
        console.log('The node list is empty')
      } else {
        this.isList = true
      }
    }
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  get text() {
    if (this.$el.tagName === 'INPUT') {
      return this.$el.value.trim()
    } else {
      return this.$el.textContent.trim()
    }
  }
  set text(text) {
    if (this.$el.tagName === 'INPUT') {
      this.$el.value = text
    } else {
      this.$el.textContent = text
    }
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
    const result = this.$el.querySelector(selector)
    return $(result)
  }
  $findAll(selector) {
    return $(this.$el.querySelectorAll(selector))
  }
  addClass(className) {
    if (this.isList) {
      this.$el.forEach($el => $el.classList.add(className))
    } else {
      this.$el.classList.add(className)
    }
    return this
  }
  removeClass(className) {
    if (this.isList) {
      this.$el.forEach($el => $el.classList.remove(className))
    } else {
      this.$el.classList.remove(className)
    }
    return this
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
  focus() {
    this.$el.focus()
    return this
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
