import {} from '../actions/actionTypes'

const initialState = {
 counter: 0

}

export default (state = initialState, action) => {
 switch (action.type) {

 case typeName:
  return { ...state, ...payload }

 default:
  return state
 }
}
