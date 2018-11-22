import {ADD_ADDRESS, DELETE_ADDRESS, LOAD_BALANCES, LOAD_TRANSACTIONS} from "../actionTypes";

export function addAddress(address) {
  return (dispatch) => {
    dispatch({
      type: ADD_ADDRESS,
      payload: { address }
    })
  
    dispatch(loadBalances(address))
  }
}

export function deleteAddress(address) {
  return {
    type: DELETE_ADDRESS,
    payload: { address }
  }
  
}

export function loadBalances(addresses) {
  return {
    type: LOAD_BALANCES,
    callAPI: `?module=account&action=balancemulti&address=${addresses}&tag=latest`,
    payload: { addresses }
  }
}

export function loadTransactions(address, page = 1, offset = 20) {
  return {
    type: LOAD_TRANSACTIONS,
    callAPI: `?module=account&action=txlist&address=${address}&page=${page}&offset=${offset}&sort=desc&`,
    payload: { address, page }
  }
}
