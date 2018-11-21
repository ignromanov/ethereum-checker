import React, {Component} from 'react';
import {Col, Container, Navbar, Row} from 'reactstrap'
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom'
import {Main} from './../routes/Main'
import {Detailed} from './../routes/Detailed'

class Layouts extends Component {
  static defaultProps = {};
  
  static propTypes = {};
  
  getDetailedComponent = ({match}) => <Detailed address={match.params.address}/>
  
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
                <Switch>
                  <Route exact path='/' component={Main}/>
                  <Route exact path='/detailed/:address' render={this.getDetailedComponent}/>
                  <Redirect path="*" to="/"/>
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