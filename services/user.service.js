import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    updateBalance
}

window.us = userService

function login(credentials) {
    return storageService.query(STORAGE_KEY).then(users => {
        const user = users.find(user =>
            user.username === credentials.username &&
            user.password === credentials.password)
        if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    })
}

function signup(userInfo) {
    return storageService.post(STORAGE_KEY, userInfo)
        .then((user) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user
        })
}

function logout() {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function updateBalance(diff) {
    const user = userService.getLoggedinUser()
    user.balance += diff
    return storageService.put(STORAGE_KEY, user)
        .then((user) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user.balance
        })
}


// Test Data
(() => {
    testUserData()
})()

function testUserData() {
    userService.signup({ username: 'muki', password: 'muki1', fullname: 'Muki Ja', balance: 10000 })
    userService.login({ username: 'muki', password: 'muki1' })
}

// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja', balance: 10000})
// userService.login({username: 'muki', password: 'muki1'})
