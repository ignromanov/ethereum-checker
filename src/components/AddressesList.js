import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'reactstrap'
import {mapToArr, mapToStrOfAddresses} from './../common'
import card from './../decorators/card'
import AddressListItem from "./AddressListItem"
import {loadBalances} from './../actions'

class AddressesList extends Component {
  static defaultProps = {
    addresses: []
  };
  
  static propTypes = {
    addresses: PropTypes.array.isRequired,
    loadBalances: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    const {loadBalances, addresses} = this.props
    loadBalances(mapToStrOfAddresses(addresses))
    
    this.intervalId = setInterval(() => loadBalances(mapToStrOfAddresses(addresses)), 15000)
  }
  
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  
  render() {
    const {addresses} = this.props
    if (!addresses.length) return <strong>No addresses chosen</strong>
    
    return (
      <ListGroup>
        {addresses.map(record =>
          <ListGroupItem key={record.address}>
            <AddressListItem addressRecord={record}/>
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  addresses: mapToArr(state.addresses.entities) // todo: make selector
})

const mapDispatchToProps = {
  loadBalances
}

export default card('Addresses', connect(mapStateToProps, mapDispatchToProps)(AddressesList));
