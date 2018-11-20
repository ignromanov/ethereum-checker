import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap'
import {connect} from 'react-redux'
import {deleteObservationAddress} from './../actions'

class AddressListItem extends PureComponent {
  static defaultProps = {};
  
  static propTypes = {
    address: PropTypes.string.isRequired
  };
  handleDeleteObserve = () => this.props.deleteObservationAddress(this.props.address)
  
  render() {
    const {address} = this.props
    return (
      <>
        {address}
        <Button close onClick={this.handleDeleteObserve}/>
      </>
    );
  }
}

export default connect(null, {deleteObservationAddress})(AddressListItem);
