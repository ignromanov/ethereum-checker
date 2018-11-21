import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap'
import card from './../decorators/card'
import Web3 from 'web3'
import {addObservationAddress} from './../actions'
import {connect} from 'react-redux'

class AddAddress extends Component {
  static defaultProps = {};
  
  static propTypes = {};
  
  state = {
    address: ''
  };
  addressChangeHandler = (ev) => this.setState({address: ev.target.value})
  addAddress = (ev) => {
    const {address} = this.state
    this.props.addObservationAddress(address)
    this.setState({address: ''})
  }
  
  render() {
    const {address} = this.state
    const isEthereumAddress = Web3.utils.isAddress(address)
    return (
      <Form inline>
        <FormGroup className="mb-5 mr-sm-5 mb-sm-0">
          <Label for="observationAddress" className="mr-sm-5">Ethereum address</Label>
          <Input type="text" name="address" id="observationAddress" placeholder='0x0' value={address}
                 valid={isEthereumAddress} className="mr-sm-5" onChange={this.addressChangeHandler}/>
        </FormGroup>
        <Button onClick={this.addAddress} color="primary" disabled={!isEthereumAddress}>Add address</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  addObservationAddress
}

export default card('Add new address to observation', connect(null, mapDispatchToProps)(AddAddress));

