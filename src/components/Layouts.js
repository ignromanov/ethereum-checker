import React, {Component} from 'react';
import {Col, Container, Navbar, Row} from 'reactstrap'
import {BrowserRouter as Router, NavLink} from 'react-router-dom'
import Routes from './../routes'

class Layouts extends Component {
  render() {
    return (
      <Router>
        <>
          <Navbar color="light" light expand="md" fixed='top' role='navigation'>
            <NavLink to='/' className='navbar-brand'>Ethereum checker</NavLink>
          </Navbar>
          <Container fluid>
            <Row>
              <Col className='main'>
                <Routes/>
              </Col>
            </Row>
          </Container>
        </>
      </Router>
    );
  }
}

export default Layouts