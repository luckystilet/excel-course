export class Page {
  constructor(params) {
    this.params = params
  }
  getRoot() {
    throw new Error('method getRoot should be implemented for each page')
  }
  afterRender() {}
  destroy() {}
}
