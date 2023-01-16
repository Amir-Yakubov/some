
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { useSelector, useEffect, useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadReviews, addReview, removeReview/* , getActionAddReview  */ } from '../store/review.actions.js'
import { reviewService } from '../services/review.service.js';
// import { loadUsers } from '../store/user.action.js'

export function ToyDetalis() {
    const navigate = useNavigate()
    const { toyId } = useParams()

    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutUserId: '' })

    const [toy, setToy] = useState(null)
    const [ischatOpen, setIschatOpen] = useState(false)

    useEffect(() => {
        if (!toyId) return
        loadToy()
        onLoadReviews()
    }, [])

    function onLoadReviews() {
        let filterBy = reviewService.getReviewFilter()
        filterBy.aboutToyId = toyId
        loadReviews(filterBy)
    }

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
            showSuccessMsg('load toy successfully')
        } catch (err) {
            showErrorMsg('Cannot load toy', err)
        }
    }

    function onChatClick() {
        console.log('hena')
        setIschatOpen(!ischatOpen)
    }

    const handleChange = ev => {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    const onAddReview = async ev => {
        ev.preventDefault()
        if (!reviewToEdit.txt || !reviewToEdit.aboutUserId) return alert('All fields are required')
        try {
            await addReview(reviewToEdit)
            showSuccessMsg('Review added')
            setReviewToEdit({ txt: '', aboutUserId: '' })
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }


    const onRemove = async reviewId => {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (err) {
            showErrorMsg('Cannot remove')
        }
    }

    function canRemove(review) {
        return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
    }

    const chatClass = ischatOpen ? "chat-window open" : "chat-window"
    const loaderImg = 'dots-loader.svg'
    const chatImg = 'chat.svg'

    if (!toy) return <img className="loader-img" src={require(`../assets/img/${loaderImg}`)} />
    else {

        return <div className='toy-detalis-main flex'>

            <section className="toy-detalis">
                <h2>{toy.name}</h2>
                <p className='price-tag-detalis'>${toy.price}</p>
                <p className='toy-desc'>{toy.desc}</p>
                <section className="labels-detalis">
                    <p>Labels</p>
                    {toy.labels.map(label => <p key={label}>{label}</p>)}
                </section>


                <form onSubmit={onAddReview} className='add-review'>
                    <label htmlFor="txt">Add review</label>
                    <textarea
                        className="review-input"
                        name='txt'
                        type="text"
                        placeholder='Hey!'
                        onChange={handleChange}
                    />
                </form>

                {reviews && <ul className="review-list">
                    {reviews.map(review => (
                        <li key={review._id}>
                            {canRemove(review) &&
                                <button onClick={() => onRemove(review._id)}>X</button>}
                            <p>
                                About:
                                <Link to={`/user/${review.aboutUser._id}`}>
                                    {review.aboutUser.fullname}
                                </Link>
                            </p>
                            <h3>{review.txt}</h3>
                            <p>
                                By:
                                <Link to={`/user/${review.byUser._id}`}>
                                    {review.byUser.fullname}
                                </Link>
                            </p>
                        </li>
                    ))}
                </ul>}

                <section className="options-btn">
                    <button> <Link to={`/toy/edit/${toy._id}`}>Edit </Link></button>
                    <button> <Link to={'/toy'}>Back</Link></button>
                </section>
            </section>

            <section className='toy-detalis-img-container'>
                <img className="toy-detalis-img" src={require(`../assets/img/${toy.imgUrl}`)} />
            </section>


            <section>
                <div className={chatClass}>
                    <h4 className='chat-title'>chat with ted</h4>
                    {/* {
                        toy.msgs?.map(msg =>
                            <ul className='chat-txt' key={msg._id}>
                                <li className='chat-user-txt'>{msg.by.fullname}</li>
                                <li className='chat-user-txt'>{msg.txt}</li>
                            </ul>)
                    } */}
                    <ul className='chat-txt'>
                        <li className='chat-user-txt'>Shalom!</li>
                        <li className='chat-user-txt'>Eze yofe</li>
                        <li className='chat-site-txt'>Toda toda</li>
                        <li className='chat-site-txt'>Ma tzarih?</li>
                    </ul>
                    <input
                        className="chat-input"
                        type="text"
                        placeholder='Hey!'
                        onChange={handleChange}
                    />
                </div>
                <img className="chat-img" onClick={onChatClick} src={require(`../assets/img/${chatImg}`)} />
            </section>
        </div>
    }

}
