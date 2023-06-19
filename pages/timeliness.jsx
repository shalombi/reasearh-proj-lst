const { connect } = ReactRedux
const { Link } = ReactRouterDOM
class _Timeliness extends React.Component {

    setWordOrder = (idx) => {
        const nums = ['First', 'Second', 'Third', 'Fourth', 'Fifth']
        return nums[idx]
    }

    render() {
        const { gIsFirstClick, user } = this.props

        if (gIsFirstClick && user) return (
            <div className="flex justify-center align-center headline-before-start">
                <Link to="/"><button>Back to the home screen</button></Link>
            </div>
        )

        return (
            <section className="about">
                <h2>⏰ &nbsp; Timeliness</h2>
                <div>
                    Times from the assignment
                    <ul>
                        {this.props.timeliness.map((timeline, idx) => {
                            return <li key={timeline + '_' + idx}>
                               User: {user.fullname} | {this.setWordOrder(idx)} word: {timeline} Sec
                            </li>
                        }
                        )}
                    </ul>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        timeliness: storeState.timeliness,
        isDeactivated: storeState.isDeactivated,
        gIsFirstClick: storeState.gIsFirstClick,
        user: storeState.user,
    }
}
export const Timeliness = connect(mapStateToProps)(_Timeliness)

