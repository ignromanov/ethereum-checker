import {OrderedMap, Record, Map} from "immutable";
import {LOAD_TRANSACTIONS, START, SUCCESS} from "../actionTypes";

// const TransactionRecord = {
//   blockNumber: undefined,
//   hash: undefined,
//   from: '',
//   to: '',
//   contractAddress: '',
//   value: 0,
//   type: ''
// }

const TransactionsPage = Record({
  page: undefined,
  txns: [],
  loaded: false,
  loading: false
})

const defaultState = new Map({})

export default (txnsState = defaultState, action) => {
  const {type, payload, response} = action
  
  switch (type) {
    case LOAD_TRANSACTIONS + START:
      return txnsState
        .set(payload.address, new Map({}))
        .setIn([payload.address, payload.page], (new TransactionsPage()).set('loading', true))
    
    case LOAD_TRANSACTIONS + SUCCESS:
      return txnsState
        .setIn([payload.address, payload.page, 'txns'], response.result)
        .setIn([payload.address, payload.page, 'loading'], false)
        .setIn([payload.address, payload.page, 'loaded'], true)
  
    default: return txnsState
  }
}