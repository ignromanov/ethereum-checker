import {OrderedMap, Record} from 'immutable'
import {
  ADD_OBSERVATION_ADDRESS,
  DELETE_OBSERVATION_ADDRESS,
  LOAD_ADDRESSES_BALANCES,
  START,
  SUCCESS
} from "../actionTypes";
import {arrToMap, collectionToStrOfAddresses} from "../common";
import Web3 from 'web3'

const AddressRecord = Record({
  address: undefined,
  balance: 0
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
    case ADD_OBSERVATION_ADDRESS:
      newState = addressesState.setIn(['entities', payload.address], new AddressRecord({address: payload.address}))
      saveToLocalStorage('addresses', collectionToStrOfAddresses(newState.entities));
      return newState
    
    case DELETE_OBSERVATION_ADDRESS:
      newState = addressesState.deleteIn(['entities', payload.address])
      saveToLocalStorage('addresses', collectionToStrOfAddresses(newState.entities));
      return newState
    
    
    case LOAD_ADDRESSES_BALANCES + START:
      return addressesState.set('loading', true)
    
    case LOAD_ADDRESSES_BALANCES + SUCCESS:
      return addressesState
        .set('entities', getUpdatedMapByResponse(addressesState.entities, response.result))
        .set('loading', false)
        .set('loaded', true)
    
    default:
      return addressesState
  }
}

const getUpdatedMapByResponse = (entities, resultArr) => {
  console.log(resultArr)
  const resultAddr = resultArr.reduce((acc, obj) =>
    entities.has(obj.account)
      ? acc.set(obj.account, new AddressRecord({address: obj.account, balance: obj.balance}))
      : acc, new OrderedMap({}))
  
  return entities.merge(resultAddr)
}