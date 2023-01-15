import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login(credentials) {
    try {
        const user = await httpService.post(BASE_URL + 'login', credentials)
        return _setLoggedinUser(user)
    } catch (err) {
        console.log('err:', err)
        throw new Error('Invalid login')
    }
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    try {
        const userToSet = await httpService.post(BASE_URL + 'signup', user)
        return _setLoggedinUser(userToSet)
    } catch (err) {
        console.log('Could not signup', err)
    }
}

async function updateScore(diff) {
    try {
        const user = await userService.getById(getLoggedinUser()._id)
        if (user.score + diff < 0) return Promise.reject('No credit')
        user.score += diff
        const userToSet = await storageService.put(STORAGE_KEY, user)
        _setLoggedinUser(userToSet)
        return user.score
    } catch (err) {
        console.log('Could not update score', err)
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.log('Could not logout', err);
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function login1(credentials) {
    return httpService.post(BASE_URL + 'login', credentials)
        .then(_setLoggedinUser)
        .catch(err => {
            console.log('err:', err)
            throw new Error('Invalid login')
        })
}
function signup1({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    return httpService.post(BASE_URL + 'signup', user)
        .then(_setLoggedinUser)
}
function updateScore1(diff) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (user.score + diff < 0) return Promise.reject('No credit')
            user.score += diff
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.score
                })
        })
}
function logout1() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}