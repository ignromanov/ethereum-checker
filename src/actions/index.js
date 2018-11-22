import {ADD_OBSERVATION_ADDRESS, DELETE_OBSERVATION_ADDRESS, LOAD_BALANCES, LOAD_TRANSACTIONS} from "../actionTypes";

export function addObservationAddress(address) {
  return (dispatch) => {
    dispatch({
      type: ADD_OBSERVATION_ADDRESS,
      payload: { address }
    })
  
    dispatch(loadBalances(address))
  }
}

export function deleteObservationAddress(address) {
  return {
    type: DELETE_OBSERVATION_ADDRESS,
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
