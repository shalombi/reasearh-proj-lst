const { connect } = ReactRedux

import { wordService } from '../services/word.service.js'
import { WordList } from '../cmps/word-list.jsx'
import { SetTime } from '../cmps/set-time.jsx'
import { UserMsg } from '../cmps/user-msg.jsx'

class _ResearchApp extends React.Component {
    state = {
        words: null,
        i: 0,
        j: 1,
        imgSrc: '',
        isWord: false,
        resetCurrTime: false,
        stopTimer: false,
        currTimeIsStopped: false,
    }
    intervalId

    componentDidMount() {
        this.loadWords()
    }

    loadFile = () => {
        return fetch('http://localhost:3030/api/word/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }
    loadWords = () => {
        // Local - use local storage
        wordService.query()
            .then((words) => {
                this.setState({ words })
            })

        // Remote - file from server side
        this.loadFile()
            .then((words) => {
                this.setState({ words })
            })
    }

    nextWord = () => {
        this.setState({ currTimeIsStopped: false })

        const { i, j, words } = this.state
        this.resetTime(false)
        this.setState(prevState => ({ i: prevState.i + 1, j: prevState.j + 1 }))

        if (j === words.length) {
            this.props.dispatch({ type: 'SET_TOGGLE_DEACTIVATED', })
            this.setState({ i: 0, j: 1 })
            this.clearInput(true)
        }
    }

    clearInput = (toClearInput) => {
        return toClearInput
    }

    clearTimerInterval = (isClear = true) => {
        this.setState({ stopTimer: isClear })
        this.setState({ resetCurrTime: true })
    }

    resetTime = (isStopped) => {
        this.props.dispatch({ type: 'SET_TIME_IS_STOPPED', timeIsStopped: isStopped, })
    }

    setTimeline = (timeline) => {
        this.props.dispatch({ type: 'SET_TIMELINE', time: timeline, })
    }

    onSetFilter = (filterBy) => {
        this.setState({ isFirstClick: false })

        const { words, i, j, isWord } = this.state
        const currWord = words.slice(i, j)[0].vendor

        if (filterBy.vendor === currWord ) {
            this.setState({ currTimeIsStopped: true })
            clearInterval(this.intervalId)
            this.resetTime(true)

            if (!isWord) {
                setTimeout(() => {
                    if (j === words.length) {
                        this.clearTimerInterval()
                    }
                    alert('I heard 🎧')
                    this.setIngSrc(true)
                    setTimeout(() => {
                        this.setIngSrc(false)
                        this.nextWord()
                    }, 2800)
                }, 1000)
                this.play()
                this.setState({ isWord: false })
            }
        }
        else {
            alert('Enter the correct word please')
            return
        }
    }

    setIngSrc = (isShow) => {
        if (isShow) {
            const { words, i, j } = this.state
            const currWord = words.slice(i, j)[0].vendor
            this.setState({ imgSrc: '../assets/img/' + currWord + '.jpeg' })
        }
        else {
            this.setState({ imgSrc: null })
        }
    }

    play = () => {
        const sound = new Audio("../audio/message-ringtone.mp3")
        sound.play()
        return Promise.resolve()
    }

    secondsToMinutes = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    onChangeIsFirstClick = (isFirstClick = false) => {
        this.props.dispatch({ type: 'SET_IS_FIRST_CLICK' })
    }

    testAudio = () => {
        console.log('testAudio')
        const sound = new Audio("../audio/message-ringtone.mp3")
        sound.play()
    }

    render() {
        const { imgSrc, words, i, j, stopTimer, resetCurrTime, currTimeIsStopped } = this.state
        const { timeliness, gIsFirstClick, user } = this.props

        if (!words) return <div>Loading...</div>

        return (
            <section>

                {gIsFirstClick && user &&
                    <div className='flex justify-center align-center'>
                        <button onClick={this.onChangeIsFirstClick} >Start test</button>
                    </div>}

                {!gIsFirstClick && user && <section className='word-app'>
                    <h2> Research App  </h2>
                    {!stopTimer && <WordList
                        onSetFilter={this.onSetFilter}
                        clearInput={this.clearInput}
                        words={words.slice(i, j)}
                    />}

                    {<SetTime
                        secondsToMinutes={this.secondsToMinutes}
                        currTimeIsStopped={currTimeIsStopped}
                        resetCurrTime={resetCurrTime}
                        stopTimer={stopTimer}
                    />}

                    {this.props.timeliness[i] > 0 && <h1>Current time:{this.secondsToMinutes(timeliness[i])}</h1>}
                    {imgSrc && <img className='fruit-img' src={imgSrc} />}
                    <UserMsg />
                </section >}
            </section>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        isDeactivated: storeState.isDeactivated,
        gIsFirstClick: storeState.gIsFirstClick,
        timeliness: storeState.timeliness,
        user: storeState.user
    }
}
export const ResearchApp = connect(mapStateToProps)(_ResearchApp)


