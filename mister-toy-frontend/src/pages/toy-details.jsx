
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadToy, saveToy } from '../store/toy.action.js'
import { toyService } from '../services/toy.service.js'
import { RESET_TOY, SET_TOY } from '../store/toy.reducer.js'
import { useEffect, useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyDetalis() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { toyId } = useParams()

    let toy = useSelector((storeState) => storeState.toyModule.toy)

    useEffect(() => {
        onLoadToy()
    }, [])

    function onLoadToy1() {
        loadToy(toyId)
            .then((toy) => {
                showSuccessMsg(`${toy.name} loaded`)
            })
            .catch(err => {
                showErrorMsg('Cannot load toy')
            })
    }

    async function onLoadToy() {
        try {
            const toy = await loadToy(toyId)
            showSuccessMsg(`${toy.name} loaded`)
        } catch (err) {
            showErrorMsg('Cannot load toy')
        }
    }

    function resetToy() {
        dispatch({ type: RESET_TOY })
        navigate('/toy')
    }

    if (!toy) return <h1>loading....</h1>
    return <div>
        <h3>Todo Details </h3>
        <h4>{toy.name}</h4>
        {/* <Link to="/toy" >Back to List</Link> */}
        <button to="/toy" onClick={resetToy}>Back to List</button>
        <Link className="toy-preview-link" to={`/toy/edit/${toy._id}`}>Edit </Link> |
    </div>

}
