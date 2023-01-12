
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadToys } from "../store/toy.action.js"

export function HomePage() {
    // const [count, setCount] = useState(10)
    const count = useSelector((storeState) => storeState.appModule.count)


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
