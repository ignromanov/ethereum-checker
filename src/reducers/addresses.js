import {OrderedMap, Record} from 'immutable'
import {ADD_ADDRESS, DELETE_ADDRESS, LOAD_BALANCES, START, SUCCESS} from "../actionTypes";
import {arrToMap, mapToStrOfAddresses} from "../common";
import Web3 from 'web3'

const AddressRecord = Record({
  address: undefined,
  balance: ''
})

const ReducerState = Record({
  loaded: false,
  loading: false,
  entities: new OrderedMap({})
})

const saveToLocalStorage = (key, value) => localStorage.setItem(key, value)
const getFromLocalStorage = key => localStorage.getItem(key)

const defaultReducerState = (() => {
  const storageAddresses = !getFromLocalStorage('addresses') ? [] :
    getFromLocalStorage('addresses').split(',').filter(address => Web3.utils.isAddress(address))
  return new ReducerState({'entities': arrToMap(storageAddresses, AddressRecord)})
})()

export default (addressesState = defaultReducerState, action) => {
  const {type, payload, response} = action
  let newState
  
  switch (type) {
    case ADD_ADDRESS:
      newState = addressesState.setIn(['entities', payload.address], new AddressRecord({address: payload.address}))
      saveToLocalStorage('addresses', mapToStrOfAddresses(newState.entities));
      return newState
    
    case DELETE_ADDRESS:
      newState = addressesState.deleteIn(['entities', payload.address])
      saveToLocalStorage('addresses', mapToStrOfAddresses(newState.entities));
      return newState
    
    
    case LOAD_BALANCES + START:
      return addressesState.set('loading', true)
    
    case LOAD_BALANCES + SUCCESS:
      return addressesState
        .set('entities', getUpdatedMapByResponse(addressesState.entities, response.result))
        .set('loading', false)
        .set('loaded', true)
    
    default:
      return addressesState
  }
}

const getUpdatedMapByResponse = (entities, resultArr) => {
  // todo: should made easier
  const resultAddr = resultArr.reduce((acc, obj) =>
    entities.has(obj.account)
      ? acc.set(obj.account, new AddressRecord({address: obj.account, balance: obj.balance}))
      : acc, new OrderedMap({}))
  
  return entities.merge(resultAddr)
}