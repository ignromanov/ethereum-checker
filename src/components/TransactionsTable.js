import React, {Component} from 'react';
import {Table} from 'reactstrap'
import card from './../decorators/card'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {fromWeiToEther, shortenAddr, shortenHash} from './../ethereum'
import Loader from './loader'

class TransactionsTable extends Component {
  static defaultProps = {
    pageState: undefined,
    transactions: []
  };
  
  static propTypes = {
    address: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
  };
  
  getTableHeader = () =>
    <tr>
      <th>hash</th>
      <th>to</th>
      <th>value</th>
      <th>block</th>
    </tr>
  
  getTableBody = () => {
    const {transactions} = this.props
    return transactions.map(txn =>
      <tr key={txn.hash}>
        <td><a href={`https://etherscan.io/tx/${txn.hash}`}>{shortenHash(txn.hash)}</a></td>
        <td>{shortenAddr(txn.to)}</td>
        <td>{fromWeiToEther(txn.value)}</td>
        <td>{txn.blockNumber}</td>
      </tr>
    )
  }
  
  render() {
    const {pageState} = this.props
    if (!pageState || pageState.loading) return <Loader/>
    if (!pageState.loaded) return <div>{pageState.error}</div>
    return (
      <Table>
        <thead>{this.getTableHeader()}</thead>
        <tbody>{this.getTableBody()}</tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state, props) => {
  const pages = state.transactions.get(props.address)
  const pageState = pages && pages.get(props.page)
  if (!pageState) return {}
  
  return {
    pageState,
    transactions: pageState.txns
  }
}


export default card('Last transactions', connect(mapStateToProps)(TransactionsTable));
