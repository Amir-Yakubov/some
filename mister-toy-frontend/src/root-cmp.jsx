

import './assets/styles/css/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutUs } from "./pages/about-us";
import { HomePage } from './pages/home-page';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { ToyIndex } from './pages/toy-index';
import { ToyEdit } from './pages/toy-edit';
import { ToyDetalis } from './pages/toy-details';
import { Dashboard } from './pages/dashboard';
import { UserProfile } from './pages/user-profile';

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app main-layout">

                    <AppHeader />

                    <main className="app-main-container">
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<UserProfile />} path='/user' />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyDetalis />} path="/toy/:toyId" />
                            <Route element={<Dashboard />} path="/dashboard" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}


