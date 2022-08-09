import { SUCCESS_USER_DETAIL } from '../../constants/auth'

const initialState = {
  userData: null
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
