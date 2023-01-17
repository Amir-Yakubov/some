

import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { userService } from "../services/user.service.js"
import { SET_USER } from "../store/user.reducer.js"

export function UserDetails() {

    const user = useSelector((storeState => storeState.userModule.user))
    const [userToUpdate, setUserToUpdate] = useState(user)
    const dispatch = useDispatch()

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setUserToUpdate((prevUser) => ({ ...prevUser, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        userService.updateUser(user)
        dispatch({ type: SET_USER, user })
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


    console.log('user from DETAILS', user)
    return <section className="user-profile">
        <div className="my-profile">

            <h2>My profile</h2>

            <form onSubmit={onSubmit}
                className="">

                <input type="text"
                    id="fullname"
                    name="fullname"
                    value={userToUpdate.fullname}
                    onChange={handleChange}
                />
                <button>Save!</button>
            </form>
        </div>

        {/* {user.activities.length > 0 && <div className="user-activities">
            <h2>Activity list!</h2>

            <ul className="activities-list">
                {user.activities.map((todo, i) =>
                    <li className="activity-preview flex" key={i}>
                        <h4>{todo.txt} at:</h4>
                        <h4>{getTime(todo.at)}</h4>
                    </li>)}
            </ul>

        </div>} */}

    </section>
}