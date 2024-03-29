import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'

import './i18n/index.ts'
import "./main.scss"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store} >
        <App />
    </Provider>
)
