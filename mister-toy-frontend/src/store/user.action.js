import { showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'
import { CLEAR_CART, SET_USER, UPDATE_USER_SCORE, UPDATE_USER } from '../store/user.reducer.js'

export async function loadUsers() {
    try {
        store.dispatch({ type: 'LOADING_START' })
        const users = await userService.getUsers()
        store.dispatch({ type: 'SET_USERS', users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: 'LOADING_DONE' })
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: 'SET_WATCHED_USER', user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

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
