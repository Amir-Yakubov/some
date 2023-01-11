import { toyService } from '../services/toy.service.js'
import { store } from './store.js'
import { REMOVE_TOY, SET_TOYS, SET_TOY, ADD_TOY, UPDATE_TOY, /* UNDO_REMOVE_TOY, */ RESET_TOY, SET_IS_LOADING } from '../store/toy.reducer.js'


export function loadToys(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then((toys) => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('Had issues loading toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}
export function loadToy(toyId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.getById(toyId)
        .then((toy) => {
            console.log('toy before dispatch', toy)
            store.dispatch({ type: SET_TOY, toy })
            console.log('return toy from action', toy);
            return toy
        })
        .catch(err => {
            console.log('Had issues loading toy', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function resetToy() {
    store.dispatch({ type: RESET_TOY })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('Had issues Removing toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save toy:', err)
            throw err
        })
}
export function saveAndResetToy(toy) {
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type: RESET_TOY })
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save toy:', err)
            throw err
        })
}


// Example for Optimistic mutation:
// export function removeToy(toyId) {
//     store.dispatch({ type: REMOVE_TOY, toyId })
//     return toyService.remove(toyId)
//         .catch(err => {
//             store.dispatch({ type: UNDO_REMOVE_TOY })
//             console.log('Had issues Removing toy', err)
//             throw err
//         })
// }