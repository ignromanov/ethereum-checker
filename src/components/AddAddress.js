import React, {Component} from 'react';
import {Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label} from 'reactstrap'

class AddAddress extends Component {
  static defaultProps = {};
  
  static propTypes = {};
  
  state = {
    address: ''
  };
  
  render() {
    return (
      <Card>
        <CardBody>
        <CardTitle>
          Add new address to watch
        </CardTitle>
          <Form inline>
            <FormGroup className="mb-5 mr-sm-5 mb-sm-0">
              <Label for="watchedAddress" className="mr-sm-5">Address to watch</Label>
              <Input type="text" name="address" id="watchedAddress" placeholder='0x0' value={this.state.address} className="mr-sm-5" onChange={this.addressChangeHandler}/>
            </FormGroup>
            <Button onClick={this.addAddress}>Add address</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
  
  addressChangeHandler = (ev) => this.setState({address: ev.target.value})
  
  addAddress = (ev) => {
    // dispatcher
    this.setState({address: ''})
  }
}

export default AddAddress;
