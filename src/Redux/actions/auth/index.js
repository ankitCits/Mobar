import { SUCCESS_USER_DETAIL, SUCCESS_LOCATION_DETAIL } from '../../constants/auth';

/**
 * Getting Authentication User
 * @param {"mobile_number","password"}
 * @return JSONObject
 */
export const setUserDetail = data => {
  return async dispatch => {
    try {
      dispatch({
        type: SUCCESS_USER_DETAIL,
        data
      });
      return data
    } catch (error) {
      return error;
    }
  };
};

export const setUserLocationDetail = data => {
  return async dispatch => {
    try {
      dispatch({
        type: SUCCESS_LOCATION_DETAIL,
        data
      });
      return data
    } catch (error) {
      return error;
    }
  };
};



