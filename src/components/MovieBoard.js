import React from 'react'
import MovieCard from './MovieCard'
import {Row,Col} from 'react-bootstrap'
export default function MovieBoard(props) {

    let movieList = props.movieList
    
    return (
        <Row>
            {movieList.map(item => {return(
            <Col md={3}>
            <MovieCard movie={item}/>
            </Col> 
            )})}
        </Row>
    )
}
