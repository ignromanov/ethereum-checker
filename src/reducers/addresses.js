import {OrderedMap, Record} from 'immutable'
import {ADD_OBSERVATION_ADDRESS} from "../actionTypes";

const AddressRecord = Record({
  address: undefined
})

const ReducerState = Record({
  loaded: false,
  loading: false,
  entities: new OrderedMap({})
})

const defaultReducerState = new ReducerState()

export default (state = defaultReducerState, action) => {
  const {type, payload, response} = action
  
  switch (type) {
    case ADD_OBSERVATION_ADDRESS:
      console.log(state)
      return state.setIn(['entities', payload.address], new AddressRecord({address: payload.address}))
    
    default:
      return state
  }
}