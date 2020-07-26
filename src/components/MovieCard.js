import React from 'react'
import { Card } from 'react-bootstrap'
import { MDBView, MDBMask } from 'mdbreact'
import VideoModal from './VideoModal'

export default function MovieCard(props) {

    let [modalShow, setModalShow] = React.useState(false)

    let item = props.movie
    let imageURL = `https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`

    const apikey = process.env.REACT_APP_APIKEY

    let vidId = item.id

    // console.log(vidId)

    const video = async (vidId) => {
        let url = `https://api.themoviedb.org/3/movie/${vidId}/videos?api_key=${apikey}&language=en-US`
        let result = await fetch(url)
        let vidData = await result.json()

        let vidLink = `https://www.youtube.com/watch?v=${vidData.results[0].key}`

        console.log(vidLink)

    }
    return (
        <div>
            <Card style={{ width: '18rem', border: 'none' }}>
                <MDBView hover zoom>
                    <Card.Img variant="top" src={imageURL} />
                    <Card.Body className="cardBody" onClick={() => {video(vidId); return setModalShow(true);}}>

                        <MDBMask overlay="black-strong">
                            <Card.Text className="cardContent">
                                <Card.Title>
                                    <h3>{item.title}</h3>
                                </Card.Title>
                                <div className='overview'>
                                    <p>{item.overview}</p>
                                </div>
                                <div className="extra">
                                    <span>Release Date: {item.release_date}</span>
                                    <span>Score: {item.vote_average}</span>
                                </div>
                            </Card.Text>
                        </MDBMask>
                    </Card.Body>
                </MDBView>
            </Card>

            <VideoModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

// 