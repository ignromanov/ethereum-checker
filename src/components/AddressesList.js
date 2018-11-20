import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'reactstrap'
import {mapToArr} from './../common'
import card from './../decorators/card'
import AddressListItem from "./AddressListItem";

class AddressesList extends Component {
  static defaultProps = {};
  
  static propTypes = {
    addresses: PropTypes.array.isRequired
  };
  
  state = {};
  
  render() {
    const {addresses} = this.props
    if (!addresses.length) return <strong>No addresses chosen</strong>
    
    return (
      <ListGroup>
        {addresses.map(record =>
          <ListGroupItem key={record.address}>
            <AddressListItem address={record.address} />
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  addresses: mapToArr(state.addresses.entities) // todo: make selector
})

export default connect(mapStateToProps)(card('Addresses', AddressesList));
