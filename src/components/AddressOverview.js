import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TransactionsTable from './TransactionsTable'
import {connect} from 'react-redux'
import {loadTransactions} from './../actions'

class AddressOverview extends Component {
  static defaultProps = {
    page: 1
  };
  
  static propTypes = {
    address: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    loadTransactions: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    const {loadTransactions, address, page} = this.props
    loadTransactions(address, page)
  }
  
  render() {
    const {address, page} = this.props
    return (
      <>
        <h3>{address}</h3>
        <TransactionsTable address={address} page={page}/>
      </>
    );
  }
}

export default connect(null, {loadTransactions})(AddressOverview);
