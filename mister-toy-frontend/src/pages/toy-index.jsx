import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { ADD_TO_CART } from '../store/toy.reducer.js'
import { useEffect } from 'react'

// import { PopupMenu } from '../cmps/popup-menu.jsx'

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    // const shoppingCart = useSelector((storeState) => storeState.toyModule.shoppingCart)
    const dispatch = useDispatch()

    useEffect(() => {
        onLoadToys()
    }, [])

    function onLoadToys1(filterBy) {
        loadToys(filterBy)
            .then(() => {
                showSuccessMsg('Toys loaded')
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }

    async function onLoadToys(filterBy) {
        try {
            await loadToys(filterBy)
            showSuccessMsg('Toys loaded')

        } catch (err) {
            showErrorMsg('Cannot load toys')
        }
    }

    function onRemoveToy1(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy1(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }
        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            showErrorMsg('Cannot update toy')
        }
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    function setFilter(filterBy) {
        console.log('setFilter', filterBy)
        onLoadToys(filterBy)
    }

    return <section className='main-container'>
        <ToyFilter onSetFilter={setFilter} />
        <h3 className='main-app-title'>TEDS Toys shop</h3>
        <main>
            {isLoading && <p>Loading...</p>}
            <button className='add-toy-btn' ><Link to={`/toy/edit`}>Add Toy</Link></button>
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
                addToCart={addToCart}
            />
        </main>
    </section>


}


const Text = () => {
    return <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eum!</span>
}