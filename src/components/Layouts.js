import React, {Component} from 'react';
import {Col, Container, Navbar, NavbarBrand, Row} from 'reactstrap'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Main} from './../routes/Main'
import {Detailed} from './../routes/Detailed'

class Layouts extends Component {
  static defaultProps = {};
  
  static propTypes = {};
  
  state = {};
  
  getDetailedComponent = ({match}) => <Detailed address={match.params.address}/>
  
  render() {
    return (
      <Router>
        <>
          <Navbar color="light" light expand="md" fixed='top' role='navigation'>
            <NavbarBrand href="/">Ethereum checker</NavbarBrand>
          </Navbar>
          <Container fluid>
            <Row>
              <Col className='main'>
                <Switch>
                  <Route exact path='/' component={Main}/>
                  <Route exact path='/detailed/:address' render={this.getDetailedComponent}/>
                </Switch>
              </Col>
            </Row>
          </Container>
        </>
      </Router>
    );
  }
}

export default Layouts