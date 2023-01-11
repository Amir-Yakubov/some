const fs = require('fs');
const PAGE_SIZE = 30000
var toys = require('../data/toy.json')


module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy) {
    console.log('!!!!!!', filterBy)
    filterBy.maxPrice = +filterBy.maxPrice
    let filteredToys = toys
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.maxPrice) {
        filteredToys = filteredToys.filter(toy => toy.price <= filterBy.maxPrice)
    }
    if (filterBy.labels) {
        const labels = filterBy.labels.split(',')
        console.log(labels)
        filteredToys = filteredToys.filter(toy => labels.every(i => toy.labels.includes(i)))
    }
    return Promise.resolve(filteredToys)
}

function get(toyId) {
    console.log('toyId', toyId)
    console.log('toys', toys)
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}

function remove(toyId, loggedinUser) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = toys[idx]
    // if (toy.owner._id !== loggedinUser._id) return Promise.reject('Not your Toy')
    toys.splice(idx, 1)
    return _writeToysToFile()
}


function save(toy, loggedinUser) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such Toy')
        // if (toyToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your Toy')

        toyToUpdate.name = toy.name
        toyToUpdate.speed = toy.speed
    } else {
        toy._id = _makeId()
        toy.owner = loggedinUser
        toys.push(toy)
    }
    return _writeToysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}