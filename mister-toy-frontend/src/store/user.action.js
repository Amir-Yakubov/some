import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'
import { CLEAR_CART, SET_USER, UPDATE_USER_SCORE, UPDATE_USER } from '../store/user.reducer.js'

export async function update(user) {
    try {
        await userService.update(user)
        store.dispatch({ type: UPDATE_USER, user })
        return user
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user

    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot signup:', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}

export async function checkout(amount) {
    try {
        const newScore = await userService.updateScore(amount)
        store.dispatch({ type: UPDATE_USER_SCORE, score: newScore })
        store.dispatch({ type: CLEAR_CART })
    } catch (err) {
        console.error('Cannot checkout:', err)
        throw err
    }
}

export function signup1(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot signup:', err)
            throw err
        })
}
export function login1(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot login:', err)
            throw err
        })
}
export function logout1() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch(err => {
            console.error('Cannot logout:', err)
            throw err
        })
}
export function checkout1(amount) {
    return userService.updateScore(amount)
        .then(newScore => {
            store.dispatch({ type: UPDATE_USER_SCORE, score: newScore })
            store.dispatch({ type: CLEAR_CART })
            return newScore
        })
        .catch(err => {
            console.error('Cannot checkout:', err)
            throw err
        })
}