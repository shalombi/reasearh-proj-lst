const Router = ReactRouterDOM.HashRouter
const { Provider } = ReactRedux;
import { store } from './store/store.js'

import { App } from './root-cmp.jsx'

const elContainer = document.getElementById('root')
const root = ReactDOM.createRoot(elContainer);
root.render(
    <Provider store={store}>
        <Router >
            <App />
        </Router>
    </Provider>
);




