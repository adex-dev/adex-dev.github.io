import { hydrate, mount } from 'svelte'
import './index.css'
import App from './App.svelte'

const target = document.getElementById('app')!
const dataElement = document.getElementById('portfolio-initial-data')
const initialData = dataElement?.textContent
  ? JSON.parse(dataElement.textContent)
  : undefined

const app = initialData && target.childNodes.length
  ? hydrate(App, { target, props: { initialData } })
  : mount(App, { target })

export default app
