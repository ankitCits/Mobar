import { COUNTER_CHANGE, SUCCESS_USER_DETAIL } from '../../constants/auth';
import { BASE_URL, A_KEY } from '../../../config';
import { getAccessToken } from '../../../localstorage';

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("A_Key", A_KEY);
/**
 * Getting Authentication User
 * @param {"mobile_number","password"}
 * @return JSONObject
 */
export const setUserDetail = payload => {
  return async dispatch => {
    // console.log("===========XXXXXXXX",payload)
    try {
      dispatch({
        type: SUCCESS_USER_DETAIL,
        data: payload
      });

      return payload
    } catch (error) {
      // dispatch({
      //   type: AUTH_USER_FAIL,
      //   data: [],
      //   message: [],
      //   status: 'Failed',
      //   user: {},
      // });
      return error;
    }
  };
};



