import {FAIL, START, SUCCESS} from "./../actionTypes";
import {ETHERSCAN_API_KEY, ETHERSCAN_API_REFERENCE} from './../keys'

export default store => next => action => {
  const {callAPI, type, ...rest} = action
  if (!callAPI) return next(action)
  
  next({
    ...rest, type: type + START, callAPI
  })
  
  const APIref = ETHERSCAN_API_REFERENCE + callAPI + `&apikey=${ETHERSCAN_API_KEY}`
  setTimeout(() => {
    fetch(APIref)
      .then(res => res.json())
      .then(response => {
        if (response.status === '0') throw response.message
        return next({...rest, type: type + SUCCESS, response})
      })
      .catch(error => next({...rest, type: type + FAIL, error}))
  }, 1000)
}