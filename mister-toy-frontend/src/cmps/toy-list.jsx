import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy }) {
    console.log(toys)
    const imgUrl = 'add-toy.svg'
    return <ul className="toy-list">
        <li className="toy-preview" key={'asdaad123'}>
            <Link to={`/toy/edit`}><img className="add-toy-img" src={require(`../assets/img/${imgUrl}`)} /></Link>
        </li>
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />

                <div>
                    <button className="remove-btn" onClick={() => { onRemoveToy(toy._id) }}>x</button>
                    <Link className="toy-preview-link" to={`/toy/edit/${toy._id}`}>Edit </Link> |
                    <Link className="toy-preview-link" to={`/toy/${toy._id}`}> Details</Link>
                </div>

            </li>)}
    </ul>
}

