import {Page} from '@core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce} from '@core/utils'
import {normalizeInitialState} from '@/redux/initialState'

export class ExcelPage extends Page {
  constructor(params) {
    super(params)
    this.excelName = `excel:${this.params}`
  }
  getRoot() {
    const store = createStore(rootReducer, normalizeInitialState(storage(this.excelName)) )
    const stateListener = debounce(state => {
      //
      //
      console.log('state from index === ', state)
      //
      //
      storage(this.excelName, state)
    }, 400)
    
    store.subscribe(stateListener)
    
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })
    
    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }
  destroy() {
    this.excel.destroy()
  }
}
