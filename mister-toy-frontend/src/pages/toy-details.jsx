
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { useEffect, useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyDetalis() {
    const navigate = useNavigate()
    const { toyId } = useParams()

    const [toy, setToy] = useState(null)

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])


    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
            showSuccessMsg('load toy successfully')
        } catch (err) {
            showErrorMsg('Cannot load toy', err)
        }
    }

    if (!toy) return <h1>loading....</h1>
    else {

        return <div>
            <h2>{toy.name}</h2>
            <p>{toy.desc}</p>
            <p>Labels</p>
            {toy.labels.map(label => <p>{label}</p>)}
            <p>${toy.price}</p>
            <img src={require(`../assets/img/${toy.imgUrl}`)} />
            <Link to={'/toy'}>Back</Link>
            <Link className="toy-preview-link" to={`/toy/edit/${toy._id}`}>Edit </Link> |
        </div>
    }

}
