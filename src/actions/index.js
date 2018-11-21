import {ADD_OBSERVATION_ADDRESS, DELETE_OBSERVATION_ADDRESS, LOAD_ADDRESSES_BALANCES} from "../actionTypes";

export function addObservationAddress(address) {
  return {
    type: ADD_OBSERVATION_ADDRESS,
    payload: { address }
  }
}

export function deleteObservationAddress(address) {
  return {
    type: DELETE_OBSERVATION_ADDRESS,
    payload: { address }
  }
  
}

export function loadAddressesBalances(addresses) {
  return {
    type: LOAD_ADDRESSES_BALANCES,
    callAPI: `?module=account&action=balancemulti&address=${addresses}&tag=latest`,
    payload: { addresses }
  }
}