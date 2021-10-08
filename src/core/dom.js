class Dom {
  #isSingleNodeCheck(methodName = 'unknown') {
    if (this.$el.length > 1) {
      console.warn(`Dom: method ".${methodName}()" work with this.$el = [$node] only,
      current length = ${this.$el.length}`)
    }
  }
  constructor(selector, isEmpty = false) {
    if (!selector && !isEmpty) throw new Error(`"${selector}" - is not valid selector for Dom class`)
    this.$el = []
    if (!isEmpty) {
      if (typeof selector === 'string') {
        this.$el = document.querySelectorAll(selector)
      } else if (selector instanceof NodeList) {
        this.$el = selector
      } else if (selector instanceof HTMLCollection) {
        for (const el of selector) {
          this.$el.push(el)
        }
      } else if (selector instanceof Element) {
        this.$el = [selector]
      } else if (Array.isArray(selector) && selector[0] instanceof Element) {
        selector.forEach($el => this.$el.push($el))
      } else {
        throw new Error('In Class Dom constructor something went wrong, selector does not match any possible cases')
      }
    }
  }
  // Change Selection Methods --------------------------------------->
  findAll(selector) {
    const result = []
    this.$el.forEach($node => {
      const $oneNodeResults = $node.querySelectorAll(selector)
      $oneNodeResults.forEach($result => result.push($result))
    })
    return $(result)
  }
  find(selector) {
    for (let i = 0; i < this.$el.length; i++) {
      const result = this.$el[i].querySelector(selector)
      if (result) {
        return $(result)
      }
    }
    return null
  }
  closest(selector) {
    const result = []
    this.$el.forEach($el => {
      const closest = $el.closest(selector)
      if (!closest) return
      result.push(closest)
    })
    return result.length ? $(result) : null
  }
  add(elements) {
    const result = [...this.$el]
    if (elements === null || elements === undefined) {
      return result
    }
    if (elements instanceof NodeList) {
      // NodeList
      elements.forEach(el => result.push(el))
    } else if (elements instanceof HTMLCollection) {
      // HTMLCollection
      for (const el of elements) {
        result.push(el)
      }
    } else if (elements instanceof Element) {
      // Element
      result.push(elements)
    } else if (Array.isArray(elements) && elements[0] instanceof Dom) {
      // Dom Array trust if 1st el is Dom then whole arr is Dom
      elements.forEach($el => result.push($el.$el))
    } else if (elements instanceof Dom) {
      // Dom List / Dom List from single Dom node
      elements.$el.forEach(el => {
        result.push(el)
      })
    } else {
      throw new Error('Dom: Not valid elements parameter in the "add()" method')
    }
    return $(result)
  }
  // Node methods -------------------------------------->
  append($node) {
    if ($node instanceof Dom) {
      $node = $node.$el[0]
    }
    this.$el.forEach($el => {
      $el.append($node)
    })
    return this
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.forEach($el => $el.innerHTML = html)
      return this
    }
    return this.$el.map($el => $el.outerHTML.trim()).join('')
  }
  get text() {
    if (this.$el.tagName === 'INPUT') {
      return this.$el[0].value.trim()
    } else {
      return this.$el[0].textContent.trim()
    }
  }
  set text(text) {
    if (this.$el.tagName === 'INPUT') {
      this.$el[0].value = text
    } else {
      this.$el[0].textContent = text
    }
  }
  clear() {
    this.html('')
    return this
  }
  // Attributes -------------------------------------->
  get data() {
    return this.$el[0].dataset
  }
  id(id) {
    if (id) {
      this.$el[0].id = id
      return this
    }
    return this.$el[0].id
  }
  addClass(className) {
    this.$el.forEach($el => $el.classList.add(className))
    return this
  }
  removeClass(className) {
    this.$el.forEach($el => $el.classList.remove(className))
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
      this.$el.forEach($node => {
        $node.style[style] = addPxForNumbers(style, value)
      })
    }
    return this
  }
  getStyles(styles = []) {
    this.#isSingleNodeCheck('getStyles')
    return styles.reduce((res, s) => {
      res[s] = this.$el[0].style[s]
      return res
    }, {})
  }
  // Events ------------------------------------------>
  on(eventType, callback) {
    this.$el.forEach($el => {
      $el.addEventListener(eventType, callback)
    })
    return this
  }
  off(eventType, callback) {
    this.$el.forEach($el => {
      $el.removeEventListener(eventType, callback)
    })
    return this
  }
  focus() {
    this.$el[0].focus()
    return this
  }
  // Other ------------------------------------------>
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
}

export function $(selector, isEmpty) {
  return new Dom(selector, isEmpty)
}
$.create = (tagName, classes = '') => {
  const el = document.createElement('div')
  if (classes) el.className = classes
  return $(el)
}
