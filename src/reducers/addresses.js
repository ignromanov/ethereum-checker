import {OrderedMap, Record} from 'immutable'
import {ADD_OBSERVATION_ADDRESS} from "../actionTypes";
import {arrToMap, mapToArr} from "../common";
import {isAddress} from "../ethereum/isAddress";

const AddressRecord = Record({
  address: undefined
})

const ReducerState = Record({
  loaded: false,
  loading: false,
  entities: new OrderedMap({})
})

const defaultReducerState = (() => {
  const storageAddresses = !localStorage.getItem('addresses') ? [] :
    localStorage.getItem('addresses').split(',').filter(address => isAddress(address))
  return new ReducerState({'entities': arrToMap(storageAddresses, AddressRecord)})
})()

export default (addressesState = defaultReducerState, action) => {
  const {type, payload, response} = action
  
  switch (type) {
    case ADD_OBSERVATION_ADDRESS:
      const newState = addressesState.setIn(['entities', payload.address], new AddressRecord({address: payload.address}))
      localStorage.setItem('addresses', mapToArr(newState.entities).map(v => v.address).join(','));
      return newState
    
    default:
      return addressesState
  }
}