
// import { WordFilter } from '../cmps/word-filter.jsx';

export function WordPreview({ word }) {
    // console.log(isFirstClick)

    return <section>
        <article className="word-preview">
            <h2> {word.vendor}</h2>
            {/* {!isFirstClick && <h2> {word.vendor}</h2>} */}
            {/* {isFirstClick && <button className="start-btn-section" onClick={() => onChangeIsFirstClick()}> Click Reset to start</button>} */}
            {/* {isFirstClick && <button className="start-btn-section"> Type any key for start</button>} */}
        </article>
    </section>


}