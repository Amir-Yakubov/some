
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header main-layout full">
            <h1>TEDS SHOP</h1>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy"> Toys</NavLink> |
                <NavLink to="/dashboard"> Dashboard</NavLink> |
                <NavLink to="/about"> About</NavLink>
            </nav>
        </header>
    )
}

