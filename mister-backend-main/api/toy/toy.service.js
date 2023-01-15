const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    if (!filterBy) filterBy = { name: '', maxPrice: 0, labels: [], inStock: '' }

    try {
        const criteria = _buildCriteria(filterBy)
        console.log('criteria', criteria)
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

function sortCriteria(filterBy) {

}

function _buildCriteria(filterBy) {
    console.log('filterBy build criteria', filterBy)
    let criteria = {}
    if (filterBy.name) {
        criteria.name = { $regex: filterBy.name, $options: 'ig' }
    }
    if (filterBy.maxPrice) {
        criteria.price = { $lte: +filterBy.maxPrice }
    }
    if (filterBy.labels.length > 0) {
        criteria.labels = { $all: filterBy.labels.split(',') }
    }
    if (filterBy.inStock) {
        if (filterBy.inStock === 'true') filterBy.inStock = true
        if (filterBy.inStock === 'false') filterBy.inStock = false
        criteria.inStock = { $eq: filterBy.inStock }
        console.log(criteria.inStock)
    }
    console.log('criteria to query', criteria)
    return criteria
}


async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    console.log('And Here!!!!!!!!!!!!!!');
    try {
        const toyToSave = {
            name: toy.name,
            desc: toy.desc,
            price: toy.price,
            inStock: toy.inStock,
            labels: toy.labels
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}



module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg
}
