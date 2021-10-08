import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {} ) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []
    //
    this.prepare()
  }
  // Настраеваем наш компонент до init()
  prepare() {}
  toHTML() {
    return ''
  }
  init() {
    this.initDOMListeners()
  }
  // сюда приходят изменения только по тем полям, на которые мы подписались
  storeChanged() {}
  isNotWatching(key) {
    return !this.subscribe.includes(key)
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
