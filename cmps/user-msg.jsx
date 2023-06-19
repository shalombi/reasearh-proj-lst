import { eventBusService } from '../services/event-bus.service.js'


export class UserMsg extends React.Component {
  timeoutId;
  removeEvent;

  state = {
    msg: null
  }

  componentDidMount() {
    // Here we listen to the event that we emited, its important to remove the listener 
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg })
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.clearMsg()
      }, 3700)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  clearMsg = () => {
    this.setState({ msg: null })
  }

  render() {
    const { msg } = this.state
    if (!msg) return <span></span>
    const msgClass = msg.type || ''
    return (
      <section className={'user-msg ' + msgClass}>
        <button onClick={this.clearMsg}>x</button>
        {msg.txt}
      </section >
    )
  }
}
