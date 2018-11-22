import React, {PureComponent} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap'
import card from './../decorators/card'
import {isAddress} from './../ethereum'
import {addObservationAddress} from './../actions'
import {connect} from 'react-redux'

class AddAddress extends PureComponent {
  state = {
    address: ''
  };
  addressChangeHandler = ev => this.setState({address: ev.target.value})
  addAddressHandler = () => {
    const {address} = this.state, {addObservationAddress} = this.props

    if(!isAddress(address)) return
    addObservationAddress(address)
    this.setState({address: ''})
  }
  
  render() {
    const {address} = this.state
    return (
      <Form inline>
        <FormGroup className="col-sm-6">
          <Label for="observationAddress" className="col-sm-4">Ethereum address</Label>
          <Input type="text" name="address" id="observationAddress" placeholder='0x0' value={address}
                 valid={isAddress(address)} className="col-sm-8" onChange={this.addressChangeHandler}/>
        </FormGroup>
        <Button onClick={this.addAddressHandler} color="primary" disabled={!isAddress(address)}>Add address</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  addObservationAddress
}

export default card('Add new address to observation', connect(null, mapDispatchToProps)(AddAddress));

