import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap'
import {connect} from 'react-redux'
import {deleteObservationAddress} from './../actions'
import {NavLink} from 'react-router-dom'
import {fromWeiToEther} from './../ethereum'

class AddressListItem extends PureComponent {
  static propTypes = {
    addressRecord: PropTypes.shape({
      address: PropTypes.string.isRequired,
      balance: PropTypes.string.isRequired,
    })
  };
  handleDeleteObserve = () => {
    const {deleteObservationAddress, addressRecord} = this.props
    deleteObservationAddress(addressRecord.address)
  }
  getAddressView = (address) => <NavLink to={`/detailed/${address}`}>{address}</NavLink>
  getBalanceView = (balance) => balance ? fromWeiToEther(balance) : 'loading...'
  
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
      <div className='container-fluid'>
        <div className='d-inline p-2 mb-2'>
          {this.getAddressView(address)}
        </div>
        <div className='d-inline bg-light p-2 mb-2'>
          {this.getBalanceView(balance)}
        </div>
        <Button close onClick={this.handleDeleteObserve}/>
      </div>
    );
  }
}

export default connect(null, {deleteObservationAddress})(AddressListItem);
