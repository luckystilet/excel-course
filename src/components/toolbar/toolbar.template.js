
function toButton(button) {
  const className = button.active ? ' active' : ''
  const meta = `
    data-value='${JSON.stringify(button.value)}'
  `
  return `
    <div
      class="button${className}"
      data-type="button-toolbar"
      ${meta}
    >
      <i class="material-icons">${button.icon}</i>
    </div>
  `
}

export function createToolbar(s) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: s['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: s['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: s['textAlign'] === 'right',
      value: {textAlign: 'right'}
    },
    {
      icon: 'format_bold',
      active: s['fontWeight'] === 'bold',
      value: {fontWeight: s['fontWeight'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      icon: 'format_italic',
      active: s['fontStyle'] === 'italic',
      value: {fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      icon: 'format_underline',
      active: s['textDecoration'] === 'underline',
      value: {textDecoration: s['textDecoration'] === 'underline' ? 'none' : 'underline'}
    }
  ]
  return buttons.map(toButton).join('')
}
