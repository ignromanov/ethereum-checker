import {ADD_OBSERVATION_ADDRESS, DELETE_OBSERVATION_ADDRESS} from "../actionTypes";

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