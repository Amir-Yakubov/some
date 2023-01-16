import { TOGGLE_CART_SHOWN } from '../store/toy.reducer.js'

import { LoginSignup } from './login-signup.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
// import { ReviewApp } from './review-app.jsx'
import { logout } from '../store/user.action.js'


export function AppHeader() {

    const user = useSelector((storeState => storeState.userModule.user))

    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: 'SET_USER', user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_SHOWN })
    }

    return (
        <header className="app-header main-layout full">
            <div className="main-row flex">
                <h1>TEDS SHOP</h1>

                {user && <section className="user-info">
                    <p><span className='logged-in-username'>{user.fullname}</span> {/* <span>${user.score.toLocaleString()}</span> */}</p>
                    <button onClick={onLogout}>Logout</button>
                </section>}

                {/* {user && <ReviewApp />} */}

                {!user && <section className="user-info">
                    <LoginSignup setUser={setUser} />
                </section>}

            </div>
            <nav>
                <NavLink className="first-a" to="/">Home</NavLink> |
                <NavLink to="/toy"> Toys</NavLink> |
                <NavLink to="/dashboard"> Dashboard</NavLink> |
                <NavLink to="/about"> About</NavLink>{/*  |
                <a href="#" onClick={onToggleCart}>
                    🛒 Cart
                </a> */}
            </nav>
        </header>



    )
}

