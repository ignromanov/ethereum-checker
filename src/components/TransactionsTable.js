import React, {Component} from 'react';
import {Table} from 'reactstrap'
import card from './../decorators/card'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Web3 from 'web3'

class TransactionsTable extends Component {
  static defaultProps = {
    pageState: undefined,
    transactions: []
  };
  
  static propTypes = {
    address: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
  };
  
  state = {};
  
  getTableHeader = () =>
    <tr>
      <th>hash</th>
      <th>to</th>
      <th>value</th>
      <th>block</th>
    </tr>
  
  getTableBody = () => {
    const {transactions} = this.props
    console.log(transactions)
    return transactions.map(txn =>
      <tr key={txn.hash}>
        <td><a href={`https://etherscan.io/tx/${txn.hash}`}>{txn.hash.substr(0, 15)}</a></td>
        <td>{txn.to.substr(0, 15)}</td>
        <td>{Web3.utils.fromWei(txn.value, 'ether')}</td>
        <td>{txn.blockNumber}</td>
      </tr>
    )
  }
  
  
  render() {
    const {address, page, pageState, transactions} = this.props
    if(!pageState || pageState.loading) return <div>Loading...</div>
    return (
      <>
        <Table>
          <thead>
            {this.getTableHeader()}
          </thead>
          <tbody>
            {this.getTableBody()}
          </tbody>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const pages = state.transactions.get(props.address)
  const pageState = pages && pages.get(props.page)
  if(!pageState) return {}
  
  return {
    pageState,
    transactions: pageState.txns
  }
}


export default connect(mapStateToProps)(card('Last transactions', TransactionsTable));
