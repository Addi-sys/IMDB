import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieBoard from './components/MovieBoard';
import NavBar from './components/NavBar'
import JumbotronSection from './components/JumbotronSection';
import { Container, Row, Col } from 'react-bootstrap'


const apikey = process.env.REACT_APP_APIKEY

function App() {
  // set current states of components
  let [movieList, setMovieList] = useState(null)

  // fetch API and save as data object
  const callApi = async () => {
    let url = ` https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`
    let result = await fetch(url)
    let data = await result.json()
    console.log(data)

    setMovieList(data.results)
  }

  // Mounts new states as changes are made
  useEffect(() => {
    callApi()
  }, [])

  // Loading screen
  if (movieList == null) {
    return (
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fimages%2Fa828888852e708d9afaaad06c7f9513f%2Ftenor.gif%3Fitemid%3D10251428&f=1&nofb=1" alt="#" />
    )
  }

  return (
    <div className="App body">
      <NavBar />
      <JumbotronSection />
      <Container>
        
          
            <MovieBoard movieList={movieList} />
            
        
      </Container>

    </div>
  );
}

export default App;
