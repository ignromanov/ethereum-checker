import {Map, Record} from "immutable";
import {FAIL, LOAD_TRANSACTIONS, START, SUCCESS} from "../actionTypes";

const TransactionsPage = Record({
  page: undefined,
  txns: [],
  loaded: false,
  loading: false,
  error: ''
})

const defaultState = new Map({})

export default (txnsState = defaultState, action) => {
  const {type, payload, response, error} = action
  
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
  
    case LOAD_TRANSACTIONS + FAIL:
      return txnsState
        .setIn([payload.address, payload.page, 'txns'], [])
        .setIn([payload.address, payload.page, 'loading'], false)
        .setIn([payload.address, payload.page, 'loaded'], false)
        .setIn([payload.address, payload.page, 'error'], error)
  
    default:
      return txnsState
  }
}