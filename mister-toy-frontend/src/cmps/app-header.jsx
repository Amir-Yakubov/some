import { SET_USER } from '../store/user.reducer.js'
import { TOGGLE_CART_SHOWN } from '../store/toy.reducer.js'
import { logout } from '../store/user.action.js'

import { LoginSignup } from './login-signup.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    const user = useSelector((storeState => storeState.userModule.user))

    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
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
            <h1>TEDS SHOP</h1>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy"> Toys</NavLink> |
                <NavLink to="/dashboard"> Dashboard</NavLink> |
                <NavLink to="/about"> About</NavLink> |
                {/* <a href="#" onClick={onToggleCart}>
                    🛒 Cart
                </a> */}
            </nav>

            {user && <section className="user-info">
                <p><span className='logged-in-username'>{user.fullname}</span> {/* <span>${user.score.toLocaleString()}</span> */}</p>
                <button onClick={onLogout}>Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup setUser={setUser} />
            </section>}

        </header>



    )
}

