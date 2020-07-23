import React from 'react'
import {Navbar, Nav, Form, Button, FormControl} from 'react-bootstrap'

export default function NavBar() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" className="nav-style">
                <Navbar.Brand href="#home">MovieBase</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </div>
    )
}