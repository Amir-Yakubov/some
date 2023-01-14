

export function ToyPreview({ toy }) {


    const imgUrl = toy.imgUrl

    return (
        <article>
            <h4>{toy.name}</h4>
            <img src={require(`../assets/img/${imgUrl}`)} />
            <span className="preview-price">${toy.price}</span>
        </article>
    )
}