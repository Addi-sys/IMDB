import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-input-range/lib/css/index.css'
import Pagination from "react-js-pagination";
import MovieBoard from './components/MovieBoard';
import CarouselSection from './components/CarouselSection';
import { Container, Navbar, Nav, Form, Button, FormControl, NavDropdown, Col, Row } from 'react-bootstrap';
import FilterBoard from './components/FilterBoard'

const apikey = process.env.REACT_APP_APIKEY

function App() {

  // set current states of components
  let [movieList, setMovieList] = useState(null)
  let [originalList, setOriginalList] = useState(null)
  let [activePage, setActivePage] = useState(1)
  let [year, setYear] = useState({ min: 1980, max: 2020 })
  let [rating, setRating] = useState({ min: 0, max: 10 })
  let [totalResult, setTotalResult] = useState(0)
  let [genres, setGenres] = useState(null)

  // fetch API and save as data object
  const callApi = async (page) => {
    let url = ` https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=${page}`
    let result = await fetch(url)
    let data = await result.json()
    console.log(data)

    setOriginalList(data.results)
    setMovieList(data.results)
    setTotalResult(data.total_results)
  }

  const sortByPopularity = (direction) => {
    let sortedList

    if (direction === 'asc') {
      sortedList = movieList.sort((a, b) => a.popularity - b.popularity)
    } else {
      sortedList = movieList.sort((a, b) => b.popularity - a.popularity)
    }
    setMovieList([...sortedList])
  }

  const sortByRating = (direction) => {
    let sortedList

    if (direction === 'dsc') {
      sortedList = movieList.sort((a, b) => a.vote_average - b.vote_average)
    } else {
      sortedList = movieList.sort((a, b) => b.vote_average - a.vote_average)
    }
    setMovieList([...sortedList])
  }

  const filterByRate = (value) => {
    let filteredList = originalList.filter((movie) =>
      movie.vote_average > value.min && movie.vote_average < value.max
    )
    setRating(value)
    setMovieList(filteredList)
    setTotalResult(filteredList.total_results)
  }

  const filterByYear = (value) => {
    let filteredList = originalList.filter((movie) => {
      let year = parseInt(movie.release_date.split('-')[0])
      return year > value.min && year < value.max
    })
    setYear(value)
    setMovieList(filteredList)
    setTotalResult(filteredList.total_results)
  }

  const categorySort = async (category) => {
    let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apikey}&language=en-US&page=1`
    let result = await fetch(url)
    let data = await result.json()

    console.log('categories', data)
    setMovieList(data.results)
    setTotalResult(data.total_results)

  }

  const getGenre = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`
    let result = await fetch(url)
    let data = await result.json()

    console.log('link', url)

    console.log("genres", data)

    setGenres(data.genres)
    callApi()
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
    setTotalResult(filteredList.total_results)
  };

  // Mounts new states as changes are made
  useEffect(() => {
    getGenre()
  // eslint-disable-next-line
  },[])

  // Loading screen
  if (movieList == null) {
    return (
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fimages%2Fa828888852e708d9afaaad06c7f9513f%2Ftenor.gif%3Fitemid%3D10251428&f=1&nofb=1" alt="#" />
    )
  }

  return (
    <div className="App body">

      <Navbar fixed='top' bg="transparent" variant="dark" className="navbar-expand-lg">
        <NavDropdown title="Sort Movies" id="basic-nav-dropdown">
          <NavDropdown.Item style={{color: 'red', fontWeight: 'bold'}} href="#action/3.1" onClick={() => sortByPopularity('asc')} >Most Popular</NavDropdown.Item>
          <NavDropdown.Item style={{color: 'red', fontWeight: 'bold'}} href="#action/3.2" onClick={() => sortByPopularity('dsc')} >Least Popular</NavDropdown.Item>
          <NavDropdown.Item style={{color: 'red', fontWeight: 'bold'}} href="#action/3.3" onClick={() => sortByRating('asc')} >Best Rated</NavDropdown.Item>
          <NavDropdown.Item style={{color: 'red', fontWeight: 'bold'}} href="#action/3.3" onClick={() => sortByRating('dsc')} >Worst Rated</NavDropdown.Item>
        </NavDropdown>

        <Navbar.Brand style={{color: 'yellow', fontWeight: 'bold'}} href="#home">MovieBase</Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link style={{color: 'red', fontWeight: 'bold'}} onClick={() => categorySort('latest')} href="#home">Latest</Nav.Link>
          <Nav.Link style={{color: 'red', fontWeight: 'bold'}} onClick={() => categorySort('now_playing')} href="#home">Now Playing</Nav.Link>
          <Nav.Link style={{color: 'red', fontWeight: 'bold'}} onClick={() => categorySort('popular')} href="#home">Popular</Nav.Link>
          <Nav.Link style={{color: 'red', fontWeight: 'bold'}} onClick={() => categorySort('top_rated')} href="#home">Top Rated</Nav.Link>
          <Nav.Link style={{color: 'red', fontWeight: 'bold'}} onClick={() => categorySort('upcoming')} href="#home">Upcoming</Nav.Link>

        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => searchByKeyword(e)} />
          <Button variant="outline-warning">Search</Button>
        </Form>
      </Navbar>
      <CarouselSection />
      <Container>
        <Row style={{ marginTop: '40px', marginLeft: '40px' }}>
          <Col md={3}>
            <FilterBoard
              filterByYear={filterByYear}
              filterByRate={filterByRate}
              year={year}
              rating={rating}
            />
          </Col>

          <Col md={9}>
            <MovieBoard movieList={movieList} genres={genres} />
          </Col>
        </Row>
      </Container>

      <Pagination
        activePage={activePage}
        itemsCountPerPage={10}
        totalItemsCount={totalResult}
        pageRangeDisplayed={5}
        onChange={(pageNum) => handlePageChange(pageNum)}
        itemClass="page-item"
        linkClass="page-link"
      />


    </div>
  );
}

export default App;
