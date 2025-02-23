import '../styles/Card.css';

function Card({ image, user, pageUrl, fact, onClick }) {
    return (
        <>
            <div className="card" onClick={onClick} tabIndex="0" onKeyDown={(e) => e.key === "Enter" ? onClick() : null} >
                <div>
                    <img className="card-image" src={image} alt="Cat" />
                    <p className="credit">Photo by {user} on <a className="image-link" href={pageUrl}>Pixabay</a></p>
                </div>
                <p className="fact">{fact}</p>
            </div>
        </>
    )
}

export default Card;