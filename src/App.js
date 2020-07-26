import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "react-js-pagination";
import MovieBoard from './components/MovieBoard';
import CarouselSection from './components/CarouselSection';
import { Container, Navbar, Nav, Form, Button, FormControl , NavDropdown} from 'react-bootstrap';

const apikey = process.env.REACT_APP_APIKEY

function App() {

  // set current states of components
  let [movieList, setMovieList] = useState(null)
  let [originalList, setOriginalList] = useState(null)
  let [activePage, setActivePage] = useState(1)

  // fetch API and save as data object
  const callApi = async (page) => {
    let url = ` https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=${page}`
    let result = await fetch(url)
    let data = await result.json()
    console.log(data)

    setOriginalList(data.results)
    setMovieList(data.results)
  }

  const categorySort = async(category) => {
    let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apikey}&language=en-US&page=1`
    let result = await fetch(url)
    let data = await result.json()

    console.log('categories',data)

    setMovieList(data.results)
  }

  const handlePageChange = (pageNum) => {
    callApi(pageNum);
    setActivePage(pageNum);
  };

  const searchByKeyword = (e) => {
    let filteredList = originalList.filter((movie) =>
      movie.title.includes(e.target.value)
    );
    setMovieList(filteredList);
  };

  // Mounts new states as changes are made
  useEffect(() => {
    callApi(activePage)
  }, [])

  // Loading screen
  if (movieList == null) {
    return (
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fimages%2Fa828888852e708d9afaaad06c7f9513f%2Ftenor.gif%3Fitemid%3D10251428&f=1&nofb=1" alt="#" />
    )
  }

  return (
    <div className="App body">

      <Navbar bg="dark" variant="dark" className="nav-style">
        <NavDropdown title="Sort Movies" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={() => categorySort('latest')} href="#action/3.1">Get Latest Movies</NavDropdown.Item>
          <NavDropdown.Item onClick={() => categorySort('now_playing')} href="#action/3.2">Get Now Playing Movies</NavDropdown.Item>
          <NavDropdown.Item onClick={() => categorySort('popular')} href="#action/3.3">Get Popular Movies</NavDropdown.Item>
          <NavDropdown.Item onClick={() => categorySort('top_rated')} href="#action/3.3">Get Top Rated Movies</NavDropdown.Item>
          <NavDropdown.Item onClick={() => categorySort('upcoming')} href="#action/3.3">Get Upcoming Movies</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Brand href="#home">MovieBase</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>

        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => searchByKeyword(e)} />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <CarouselSection />
      <Container>

        <MovieBoard movieList={movieList} />

      </Container>

      <Pagination
        activePage={activePage}
        itemsCountPerPage={10}
        totalItemsCount={100}
        pageRangeDisplayed={5}
        onChange={(pageNum) => handlePageChange(pageNum)}
        itemClass="page-item"
        linkClass="page-link"
      />


    </div>
  );
}

export default App;
