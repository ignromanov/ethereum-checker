import {OrderedMap, Record} from 'immutable'
import {ADD_OBSERVATION_ADDRESS, DELETE_OBSERVATION_ADDRESS} from "../actionTypes";
import {arrToMap, mapToArrOfAddresses} from "../common";
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
  let newState
  
  switch (type) {
    case ADD_OBSERVATION_ADDRESS:
      newState = addressesState.setIn(['entities', payload.address], new AddressRecord({address: payload.address}))
      localStorage.setItem('addresses', mapToArrOfAddresses(newState.entities).join(','));
      return newState
    
    case DELETE_OBSERVATION_ADDRESS:
      newState = addressesState.deleteIn(['entities', payload.address])
      localStorage.setItem('addresses', mapToArrOfAddresses(newState.entities).join(','));
      return newState
    
    default:
      return addressesState
  }
}