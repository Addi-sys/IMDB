import React , {useState} from 'react'
import { Card, Badge } from 'react-bootstrap'
import { MDBView, MDBMask } from 'mdbreact'
import VideoModal from './VideoModal'

export default function MovieCard({movie, genres }) {

    let [modalShow, setModalShow] = React.useState(false)
    let  [vidLink, setVidLink]= useState('')

    let imageURL = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`

    const apikey = process.env.REACT_APP_APIKEY

    let vidId = movie.id

    // console.log(vidId)

    const video = async (vidId) => {
        
        let url = `https://api.themoviedb.org/3/movie/${vidId}/videos?api_key=${apikey}&language=en-US`
        let result = await fetch(url)
        let vidData = await result.json()

        let link = `https://www.youtube.com/embed/${vidData.results[0].key}`  

        // return vidLink
        console.log("vvv",vidLink)
        setVidLink(link)

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
                                    <h3>{movie.title}</h3>
                                </Card.Title>
                                <div className='overview'>
                                    <p>{movie.overview}</p>
                                </div>
                                <div className="extra">
                                    <span>Release Date: {movie.release_date}</span>
                                    <span>Score: {movie.vote_average}</span>
                                </div>
                                <div>
                                    {movie.genre_ids.map((genre) => {
                                        return (
                                            <Badge variant="danger" style={{marginRight: '10px'}}>
                                                {genres.find((item) => item.id === genre).name}
                                            </Badge>
                                        )
                                    })}
                                </div>
                            </Card.Text>
                        </MDBMask>
                    </Card.Body>
                </MDBView>
            </Card>

            <VideoModal
                video={vidLink}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

// 