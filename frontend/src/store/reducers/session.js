import {SET_USER} from '../actions/session'

const inititalState = {user: null};
const sessionReducer = (state = inititalState, action) => {
  let newState;
  switch(action.type) {
    case SET_USER:
      newState = Object.assign({...state}, {user: action.payload})
      return newState;
    default:
      return state;
  }
}

export default sessionReducer