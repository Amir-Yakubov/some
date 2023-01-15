

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "../services/user.service.js"
// import { SET_USER } from "../store/user.reducer.js"


export function UserProfile() {

    const todos = useSelector((storeState => storeState.todos))
    const user = useSelector((storeState => storeState.user))
    const [userPref, setUserPref] = useState(user.prefs)
    const dispatch = useDispatch()


    userService.updateProgress(todos)
    console.log('user', user)
    console.log('userPref', userPref)

    function handlePrefsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setUserPref((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    function onSubmitPreference(ev) {
        ev.preventDefault()
        user.prefs = userPref
        user.fullname = userPref.fullname
        console.log('user.prefs before dispatch', user.prefs)
        userService.updateUser(user)
        dispatch({ type: 'SET_USER', user })
    }

    function getTime(time) {
        var date = new Date(time)
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes
        var strTime = hours + ':' + minutes + ' ' + ampm
        return strTime
    }

    return <section className="user-profile">
        <div className="my-profile">

            <h2>My profile</h2>

            <form onSubmit={onSubmitPreference}
                className="preference">

                <input type="text"
                    id="fullname"
                    name="fullname"
                    value={userPref.fullname}
                    onChange={handlePrefsChange}
                />
                <label htmlFor="color"> Color </label>
                <input type="color"
                    id="color"
                    name="color"
                    value={userPref.color}
                    onChange={handlePrefsChange}
                />
                <label htmlFor="bgColor"> BG Color </label>
                <input type="color"
                    id="bgColor"
                    name="bgColor"
                    value={userPref.bgColor}
                    onChange={handlePrefsChange}
                />
                <button>Save!</button>
            </form>
        </div>

        {user.activities.length > 0 && <div className="user-activities">
            <h2>Activity list!</h2>

            <ul className="activities-list">
                {user.activities.map((todo, i) =>
                    <li className="activity-preview flex" key={i}>
                        <h4>{todo.txt} at:</h4>
                        <h4>{getTime(todo.at)}</h4>
                    </li>)}
            </ul>

        </div>}

    </section>
}