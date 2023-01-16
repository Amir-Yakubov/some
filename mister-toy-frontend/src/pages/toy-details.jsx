
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { useEffect, useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyDetalis() {
    const navigate = useNavigate()
    const { toyId } = useParams()

    const [toy, setToy] = useState(null)
    const [ischatOpen, setIschatOpen] = useState(false)

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

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

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        console.log(value)
        // setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const chatClass = ischatOpen ? "chat-window open" : "chat-window"
    const loaderImg = 'dots-loader.svg'
    const chatImg = 'chat.svg'

    if (!toy) return <img className="loader-img" src={require(`../assets/img/${loaderImg}`)} />
    else {

        return <div className='toy-detalis-main flex'>

            <section className="toy-detalis">
                <h2>{toy.name}</h2>
                <p className='toy-desc'>{toy.desc}</p>
                <section className="labels-detalis">
                    <p>Labels</p>
                    {toy.labels.map(label => <p>{label}</p>)}
                </section>
                <p className='price-tag-detalis'>${toy.price}</p>
                {
                    toy.msgs?.map(msg =>
                        <div className="toy-msgs" key={msg._id}>
                            <p>{msg.txt}</p>
                            <p>{msg.by.fullname}</p>
                        </div>)
                }
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
