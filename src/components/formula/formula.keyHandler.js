export function keyHandler(event, formula) {
  const {key} = event
  if (key === 'Enter' || key === 'Tab') {
    event.preventDefault()
    formula.$emit('formula:enter')
  }
}
