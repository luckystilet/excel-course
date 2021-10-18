import {storage} from '@core/utils'

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
    <li>
      <a class="db__record" href="#excel/${id}">
        <span>${model.title}</span>
        <strong>
          ${new Date(model.openedDate).toLocaleDateString()}
          ${new Date(model.openedDate).toLocaleTimeString()}
        </strong>
      </a>
    </li>
  `
}

export function createRecordsTable() {
  const keys = Object.keys(localStorage)
      .filter(key => key.includes('excel:'))
  if (!keys.length) return `<p>Вы пока не создали ни одной таблицы</p>`
  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}
