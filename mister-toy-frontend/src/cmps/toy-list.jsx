import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
    return <ul className="toy-list">
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

