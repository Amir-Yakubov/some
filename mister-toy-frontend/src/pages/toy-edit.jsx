
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MyForm } from '../cmps/my-form.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'
import { store } from '../store/store.js'
import { loadToy, saveToy, resetToy } from '../store/toy.action.js'
import { SET_TOY } from '../store/toy.reducer.js'

export function ToyEdit() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { toyId } = useParams()

    let toy = useSelector((storeState) => storeState.toyModule.toy)

    useEffect(() => {
        onLoadToy()
    }, [])

    function onLoadToy1() {
        if (!toyId) return
        loadToy(toyId)
            .then((toy) => {
                showSuccessMsg(`${toy.name} loaded`)
            })
            .catch(err => {
                showErrorMsg('Cannot load toy', err)
            })
    }

    async function onLoadToy() {
        if (!toyId) return
        try {
            const toy = await loadToy(toyId)
            showSuccessMsg(`${toy.name} loaded`)
        } catch (err) {
            showErrorMsg('Cannot load toy', err)
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        toy = { ...toy, [field]: value }
        dispatch({ type: SET_TOY, toy })
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            await saveToy(toy)
            resetToy()
            navigate('/toy')
        } catch (err) {
            showErrorMsg('Cannot save toy', err)
        }
    }

    return (
        <section className="toy-edit">
            <h2>{toy._id ? 'Edit this toy' : 'Add a new toy'}</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toy.name}
                    onChange={handleChange}
                />
                <div>
                    <button>{toy._id ? 'Save' : 'Add'}</button>
                    <button onClick={() => resetToy()}><Link to="/toy" >Cancel</Link></button>
                </div>
            </form>
        </section>
    )
}