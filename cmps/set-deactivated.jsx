const { connect } = ReactRedux

import { showSuccessMsg } from '../services/event-bus.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'

class _SetDeactivated extends React.Component {

  state = {
    keyPressed: '',
    defaultCredentials: {
      balance: 10000,
      fullname: "Muki Ja",
      password: "muki1",
      username: "muki"
    }

  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    const { key } = event;
    const keyPressed = this.state.keyPressed.toLocaleLowerCase()
    // console.log(keyPressed)
    this.setState({ keyPressed: keyPressed + key })

    if (keyPressed.includes('e') && keyPressed.includes('x') && keyPressed.includes('i') && keyPressed.includes('t')) {
      showSuccessMsg('Exiting disabled mode was successful ✅')
      this.cancelDeactivated()
    }

    if (keyPressed.includes('a') && keyPressed.includes('d') && keyPressed.includes('m') && keyPressed.includes('i') && keyPressed.includes('n') && keyPressed.includes('l') && keyPressed.includes('o') && keyPressed.includes('g')) {
      showSuccessMsg('Authentication was successful | You are now logged in as muki ✅')
      this.doLoginDefaultUser()
    }

  }


  doLoginDefaultUser = () => {
    this.setState({ keyPressed: '' })
    
    const { defaultCredentials } = this.state
    userService.login(defaultCredentials)
      .then(user => {
        this.props.dispatch({ type: 'SET_USER', user })
      })
  }

  cancelDeactivated() {

    // e+x+i+t+space 
    const pass = prompt('password?')
    if (pass === '7512') {
      showSuccessMsg('✅ Verify | Disabled mode is cancelled')
      this.props.dispatch({ type: 'SET_TOGGLE_DEACTIVATED' })
      this.setState({ keyPressed: '' })
    }
    else {
      showErrorMsg('❌ The password is incorrect')
      this.setState({ keyPressed: '' })
      return
    }

  }
  render() {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (storeState) => {
  return {
    isDeactivated: storeState.isDeactivated
  }
}
export const SetDeactivated = connect(mapStateToProps)(_SetDeactivated)

