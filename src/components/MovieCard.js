import React from 'react'
import {Card} from 'react-bootstrap'

export default function MovieCard(props) {

    let item = props.movie
    let imageURL = `https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={imageURL} />
                <Card.Body>
                   <span>{item.release_date}</span>
                   <span>{item.popularity}</span>
                    <Card.Text>
                        {item.overview}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

//              <><h1></h1><h3>{item.popularity}</h3></>

// <Card.Title>{item.title}</Card.Title>