
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { loadToys } from "../store/toy.action.js"

export function HomePage() {

    useEffect(() => {
        loadToys()
    }, [])

    const imgUrl = 'hero.png'
    return (
        <section>

            <img src={require(`../assets/img/${imgUrl}`)} />
            <Link className="enter-shop" to={`/toy/`}>SHOP NOW!</Link>
        </section >
    )

}
