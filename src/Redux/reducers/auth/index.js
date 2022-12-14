import { SUCCESS_USER_DETAIL, SUCCESS_LOCATION_DETAIL } from '../../constants/auth'

const initialState = {
  userData: null,
  position: {
    latitude: 0,
    longitude: 0,
    isLocation: false
  }
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_USER_DETAIL:
      return {
        ...state,
        userData: action.data
      }
    case SUCCESS_LOCATION_DETAIL:
      return {
        ...state,
        position: action.data
      }
    default:
      return state
  }
}
export default authReducer
