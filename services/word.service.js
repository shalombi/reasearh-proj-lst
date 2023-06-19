
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'word'

export const wordService = {
    query,
    getById,
    save,
    remove,
    getEmptyWord
}


function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(wordId) {
    return storageService.get(STORAGE_KEY, wordId)
}
function remove(wordId) {
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, wordId)
}
function save(word) {
    if (word._id) {
        return storageService.put(STORAGE_KEY, word)
    } else {
        // When switching to backend - remove the next line!
        word.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, word)
    }
}

function getEmptyWord() {
    return {
        vendor: 'Apple-' + (Date.now() % 1000),
    };
}

// TEST DATA
(() => {
    testData()
})()

function testData() {
    storageService._save('word',
        [
            { vendor: 'apple', _id: utilService.makeId() }
            , { vendor: 'mango', _id: utilService.makeId() }
            , { vendor: 'pineapple', _id: utilService.makeId() }
        ])
}
