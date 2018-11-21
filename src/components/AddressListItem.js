import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap'
import {connect} from 'react-redux'
import {deleteObservationAddress} from './../actions'
import {NavLink} from 'react-router-dom'
import Web3 from 'web3'

class AddressListItem extends PureComponent {
  static defaultProps = {};
  
  static propTypes = {
    addressRecord: PropTypes.object.isRequired
  };
  handleDeleteObserve = () => this.props.deleteObservationAddress(this.props.address)
  
  render() {
    const {address, balance} = this.props.addressRecord
    const balanceView = balance ?
      <div className='d-inline bg-light p-2 mb-2'>
          {parseFloat(Web3.utils.fromWei(balance.toString(), 'ether')).toFixed(6) + ' Ξ'}
      </div> : null
    return (
      <div>
        <div className='d-inline p-2 mb-2'><NavLink to={`/detailed/${address}`}>{address}</NavLink></div>
        {balanceView}
        <Button close onClick={this.handleDeleteObserve}/>
      </div>
    );
  }
}

export default connect(null, {deleteObservationAddress})(AddressListItem);
