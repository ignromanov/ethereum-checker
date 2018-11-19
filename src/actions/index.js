import {ADD_OBSERVATION_ADDRESS} from "../actionTypes";

export function addObservationAddress(address) {
  return {
    type: ADD_OBSERVATION_ADDRESS,
    payload: { address }
  }
}