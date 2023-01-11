
export function PopupMenu(props) {
    return (
        <section className="popup-menu">
            {props.top}
            {props.children}
            <button>Back</button>
        </section>
    )
}
