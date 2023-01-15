
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
    const queryParams = `?name=${filterBy.txt}&maxPrice=${filterBy.maxPrice}&labels=${filterBy.labels}&inStock=${filterBy.inStock}`
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
        console.log('toy FROM TOY SERVICE PUT', toy)
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        toy.owner = userService.getLoggedinUser()
        console.log('toy FROM TOY SERVICE POST', toy)
        return httpService.post(BASE_URL, toy)
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', labels: [], inStock: '' }
}
function getEmptyToy() {
    return {
        name: "",
        desc: "",
        price: '',
        labels: [],
        createdAt: 0,
        inStock: true,
        imgUrl: "new.jpg"
    }
}

function getRandomToy() {
    return {
        name: 'New toy',
        price: utilService.getRandomIntInclusive(100, 500),
    }
}


