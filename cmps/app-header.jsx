const { NavLink } = ReactRouterDOM
const { connect } = ReactRedux

import { userService } from "../services/user.service.js"
import { LoginSignup } from "./login-signup.jsx"

class _AppHeader extends React.Component {

    onLogin = (credentials) => {
        userService.login(credentials)
            .then(user => {
                this.props.dispatch({ type: 'SET_USER', user })
            })
    }
    
    onSignup = (credentials) => {
        userService.signup(credentials)
            .then(user => {
                this.props.dispatch({ type: 'SET_USER', user })
            })
    }

    onLogout = () => {
        userService.logout()
            .then(() => {
                this.props.dispatch({ type: 'SET_USER', user: null })
            })
    }

    doReset = () => {
        window.location.reload()
    }

    render() {
        const { isDeactivated, gIsFirstClick, user } = this.props

        if (!user) return (
            <div>
                <h3 className="login-txt">Please login first</h3>
                <div>
                    <LoginSignup onLogin={this.onLogin} onSignup={this.onSignup} />
                </div>
            </div>
        )

        if (gIsFirstClick && user) return (
            <div className="flex justify-center align-center headline-before-start">
                <h2>Please enter start</h2>
            </div>
        )

        if (isDeactivated && user) return <div className="headline"><p>Deactivated | Please complete the task </p></div>

        return (
            <header className="headline">
                <h1>✅ Amazing </h1>
                <button className="restart-btn" onClick={this.doReset}>Reset</button>

                <nav>
                    <NavLink to="/Timeliness">Timeliness </NavLink> |
                    <NavLink exact to="/">Research App</NavLink>
                </nav>

            </header >
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        isDeactivated: storeState.isDeactivated,
        gIsFirstClick: storeState.gIsFirstClick,
        user: storeState.user,
    }
}
export const AppHeader = connect(mapStateToProps)(_AppHeader)
