
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy = getDefaultFilter()) {
    const queryParams = `?name=${filterBy.txt}&maxPrice=${filterBy.maxPrice}&labels=${filterBy.labels}`
    return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
    // return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        toy.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, toy)
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: 0, labels: [] }
}
function getEmptyToy() {
    return {
        name: '',
        price: 0,
        _id: ''
    }
}

function getRandomToy() {
    return {
        name: 'New toy',
        price: utilService.getRandomIntInclusive(100, 500),
    }
}


// function query(filterBy = getDefaultFilter()) {
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             if (filterBy.txt) {
//                 const regex = new RegExp(filterBy.txt, 'i')
//                 toys = toys.filter(toy => regex.test(toy.name))
//             }
//             if (filterBy.maxPrice) {
//                 toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
//             }
//             return toys
//         })
// }


