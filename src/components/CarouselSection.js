import React from 'react'
import { Carousel } from 'react-bootstrap'
import { MDBView, MDBMask } from 'mdbreact'

export default function CarouselSection(props) {

    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <MDBView hover zoom>
                        <img
                            className="d-block w-100 "
                            src="https://image.tmdb.org/t/p/w1920_and_h800_face/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
                            alt="First slide"
                        />
                        <MDBMask overlay="black-strong">
                            <Carousel.Caption>
                                <h3>Joker</h3>
                                <p>During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.</p>
                            </Carousel.Caption>
                        </MDBMask>
                    </MDBView>
                </Carousel.Item>
                <Carousel.Item>
                    <MDBView hover zoom>
                        <img
                            className="d-block w-100"
                            src="https://image.tmdb.org/t/p/w1920_and_h800_face/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
                            alt="Second slide"
                        />
                        <MDBMask overlay="black-strong">
                            <Carousel.Caption>
                                <h3>Avengers: Infinity War</h3>
                                <p>As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.</p>
                            </Carousel.Caption>
                        </MDBMask>
                    </MDBView>
                </Carousel.Item>
                <Carousel.Item>
                    <MDBView hover zoom>
                        <img
                            className="d-block w-100"
                            src="https://image.tmdb.org/t/p/w1920_and_h800_face/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
                            alt="Third slide"
                        />
                        <MDBMask overlay="black-strong">
                            <Carousel.Caption>
                                <h3>Parisite</h3>
                                <p>All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.</p>
                            </Carousel.Caption>
                        </MDBMask>
                    </MDBView>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
