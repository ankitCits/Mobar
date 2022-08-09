import { COUNTER_CHANGE, SUCCESS_USER_DETAIL } from '../../constants/auth'

const initialState = {
  count: 0,
  userData:null
}
const authReducer = (state = initialState, action) => {
  // console.log("=======================>>>>>>>",action)
  switch (action.type) {
    case COUNTER_CHANGE:
      return {
        ...state,
        count: action.payload
      }
      case SUCCESS_USER_DETAIL:
      return {
        ...state,
        userData: action.data
      }
    default:
      return state
  }
}
export default authReducer
