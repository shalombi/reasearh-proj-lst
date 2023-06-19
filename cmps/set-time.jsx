const { connect } = ReactRedux

class _SetTime extends React.Component {

    state = {
        time: 0,
        currWordTimer: 0,
    }

    intervalId = null
    currIntervalId = null

    componentDidMount() {
        this.startTime()
        this.startCurrWordTime()
    }

    startCurrWordTime = () => {
        this.currIntervalId = setInterval(() => {

            this.setState(prevState => ({ currWordTimer: prevState.currWordTimer + 1 }))

            if (this.props.currTimeIsStopped) {
                this.setState({ currWordTimer: 0 })
                clearInterval(this.currIntervalId)
                if (this.state.currWordTimer > 0) this.props.dispatch({ type: 'SET_TIMELINES', time: this.state.currWordTimer })
            }

            if (this.props.stopTimer) {
                this.setState({ currWordTimer: 0 })
                clearInterval(this.intervalId)
            }

        }, 1000);
    }

    startTime = () => {
        this.startCurrWordTime()

        this.intervalId = setInterval(() => {
            this.setState(prevState => ({ time: prevState.time + 1 }))
            if (this.props.stopTimer) {
                clearInterval(this.intervalId)
            }
        }, 1000)
    }

    render() {
        const { time } = this.state
        return (
            <section className="countdown-cmp">

                {this.props.stopTimer && <h1>Total time | Including banners etc. : {this.props.secondsToMinutes(time)}</h1>}
            </section>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        timeIsStopped: storeState.timeIsStopped,
    }
}
export const SetTime = connect(mapStateToProps)(_SetTime)
