import React from 'react'
import MovieCard from './MovieCard'
import { Row, Col } from 'react-bootstrap'

export default function MovieBoard({movieList, genres}) {


    return (
        <Row>
            {movieList.map((item) => {
                return (
                    <Col md={4} className="columnStyle">
                        <MovieCard movie={item} genres={genres} />
                    </Col>
                )
            })}
        </Row>
    )
}
