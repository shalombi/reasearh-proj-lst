const { Switch, Route } = ReactRouterDOM
import routes from './routes.js'

import { AppHeader } from './cmps/app-header.jsx'
import { SetDeactivated } from './cmps/set-deactivated.jsx'

export class App extends React.Component {

    render() {
        return (
            <div>
                <AppHeader />
                <SetDeactivated />
                <main>
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
            </div>
        )
    }
}


