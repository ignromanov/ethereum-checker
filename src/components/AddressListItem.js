import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap'
import {connect} from 'react-redux'
import {deleteObservationAddress} from './../actions'
import {NavLink} from 'react-router-dom'
import Web3 from 'web3'

class AddressListItem extends PureComponent {
  static propTypes = {
    addressRecord: PropTypes.shape({
      address: PropTypes.string.isRequired,
      balance: PropTypes.string.isRequired,
    })
  };
  handleDeleteObserve = () => this.props.deleteObservationAddress(this.props.address)
  getAddressView = (address) =>
    <div className='d-inline p-2 mb-2'>
      <NavLink to={`/detailed/${address}`}>{address}</NavLink>
    </div>
  getBalanceView = (balance) => balance ?
    <div className='d-inline bg-light p-2 mb-2'>
      {parseFloat(Web3.utils.fromWei(balance.toString(), 'ether')).toFixed(6) + ' Ξ'}
    </div> : null
  
  constructor(props) {
    super(props)
    
    const {address, balance} = props
    this.state = {address, balance}
  }
  
  static getDerivedStateFromProps(newProps, state) {
    if (newProps.address !== state.address || newProps.balance !== state.balance) {
      return {
        address: newProps.address,
        balance: newProps.balance
      }
    }
    
    return null
  }
  
  render() {
    const {address, balance} = this.props.addressRecord
    return (
      <div>
        {this.getAddressView(address)}
        {this.getBalanceView(balance)}
        <Button close onClick={this.handleDeleteObserve}/>
      </div>
    );
  }
}

export default connect(null, {deleteObservationAddress})(AddressListItem);
