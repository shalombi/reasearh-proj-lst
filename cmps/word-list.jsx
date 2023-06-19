import { WordFilter } from './word-filter.jsx';

import { WordPreview } from './word-preview.jsx';
export function WordList({ words, onSetFilter, clearInput}) {

    return <section className="">

        {words.map(word => <section key={word._id}>
            <WordPreview
                // onChangeIsFirstClick={onChangeIsFirstClick}
                // isFirstClick={isFirstClick}
                word={word}
            />
            <WordFilter
                word={word}
                onSetFilter={onSetFilter}
                clearInput={clearInput}
            //  onChangeIsFirstClick={onChangeIsFirstClick} 
            //  isFirstClick={isFirstClick}
            />
        </section>

        )}

    </section>
}