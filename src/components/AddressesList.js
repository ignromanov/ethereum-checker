import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'reactstrap'
import {mapToArr, collectionToStrOfAddresses} from './../common'
import card from './../decorators/card'
import AddressListItem from "./AddressListItem"
import {loadAddressesBalances} from './../actions'

class AddressesList extends Component {
  static defaultProps = {};
  
  static propTypes = {
    addresses: PropTypes.array.isRequired
  };
  
  state = {
    // addresses: []
  };
  
  componentDidMount() {
    this.props.loadAddressesBalances(collectionToStrOfAddresses(this.props.addresses))
  }
  
  render() {
    const {addresses} = this.props
    if (!addresses.length) return <strong>No addresses chosen</strong>
    
    return (
      <ListGroup>
        {addresses.map(record =>
          <ListGroupItem key={record.address}>
            <AddressListItem addressRecord={record} />
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
  loadAddressesBalances
}

export default connect(mapStateToProps, mapDispatchToProps)(card('Addresses', AddressesList));
