const { connect } = ReactRedux

class _WordFilter extends React.Component {

    state = {
        filterBy: {
            vendor: '',
        },
    }

    inputRef = React.createRef()

    componentDidMount() {
        // console.log(this.props)
        // this.makeFocus()
        this.onClearInput()
    }

    onClearInput = () => {
        if (this.props.clearInput()) {
            this.setState({ filterBy: { vendor: '' } })
        }
    }

    handleChange = ({ target }) => {
        // console.log(this.props.isFirstClick)
        // if (this.props.isFirstClick) this.props.onChangeIsFirstClick()

        this.doDeactivated()

        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            // this.props.onSetFilter(this.state.filterBy)
        })
    }

    makeFocus = () => {
        this.inputRef.current.focus()
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    doDeactivated = () => {
        const { isDeactivated } = this.props
        if (!isDeactivated) {
            this.props.dispatch({ type: 'SET_TOGGLE_DEACTIVATED'})
        }
    }

    render() {
        const { vendor } = this.state.filterBy
        // const {isFirstClick} = this.props
        //  if(isFirstClick) return <div></div>
        return (<section className="word-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-vendor"></label>
                <input
                    ref={this.inputRef}
                    type="text"
                    placeholder="Enter the word..."
                    id="by-vendor"
                    name="vendor"
                    value={vendor}
                    onChange={this.handleChange}
                />

                <button>Next word</button>
            </form>
        </section>)
    }
}


const mapStateToProps = (storeState) => {
    return {
        isDeactivated: storeState.isDeactivated,
    }
}
export const WordFilter = connect(mapStateToProps)(_WordFilter)
