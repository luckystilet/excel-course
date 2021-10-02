export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // dispatch / fire / trigger
  // Уведомляем слушателей, если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) return false
    this.listeners[event].forEach(listener => listener(...args))
    return true
  }
  // on / listen
  // Подписываемся на уведомление / добавляем нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter(listener => listener !== fn)
    }
  }
}

// const emitter = new Emitter()
// const unSub = emitter.subscribe('sasha', data => console.log('Sub:', data))
// emitter.emit('sasha', 42)
// setTimeout(()=>{
//   emitter.emit('sasha', 33)
// }, 1000)
// setTimeout(()=>{
//   emitter.emit('sasha', 44)
//   unSub()
// }, 2000)
// setTimeout(()=>{
//   emitter.emit('sasha', 55)
// }, 3000)
