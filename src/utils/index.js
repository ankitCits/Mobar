// import moment from 'moment'

const Util = {
  /**
   * Is the text is empty or not
   * @param {*} text
   * @return Boolean true|false
   */
  isEmpty: function (text) {
    return !text || text.trim().length === 0;
  },

  /**
   * Validate mobile number
   * @param {*} mobileNumber
   * @return Boolean true|false
   */
  validMobile: function (mobileNumber) {
    if (this.isEmpty(mobileNumber)) {
      return false;
    } else {
      if (mobileNumber.trim().length == 8) {
        return true;
      } else {
        return false;
      }
    }
  },

  /**
   * Validate Email number
   * @param {*} Email
   * @return Boolean true|false
   */
  validEmail: function ValidateEmail(mail) {
    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * Validate otp number
   * @param {*} otpNumber
   * @return Boolean true|false
   */
  validOtp: function (otpNumber) {
    if (this.isEmpty(otpNumber)) {
      return false;
    } else {
      if (otpNumber.trim().length === 4) {
        return true;
      } else {
        return false;
      }
    }
  },

  /**
   * Check whether terms and condition is accepted or not
   * @param {*} isAgreed
   * @return Boolean true|false
   */
  isTermsAccepted: function (isAgreed) {
    if (typeof isAgreed === 'boolean') {
      if (isAgreed) {
        return {
          status: true,
          message: 'You are aggreed',
        };
      } else {
        return {
          status: false,
          message: 'You are not aggreed',
        };
      }
    } else {
      return {
        status: false,
        message: 'You are not aggreed',
      };
    }
  },

  /**
   * Validate whether text having alphabets and space or not
   * @param {*} value
   * return Boolean true|false
   */
  isValidName: function (value) {
    const regEx = /^[a-zA-Z ]+$/;

    if (!value) {
      return false;
    }
    if (value.trim().match(regEx)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * Validate whether text with in a range or not
   * @param {*} min
   * @param {*} max
   * return Boolean true|false
   */
  isValidRange: function (value, min, max) {
    let textLength = 0;
    if (value) {
      textLength = value.trim().length;
    }
    if (textLength >= min && textLength <= max) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * Validate whether Date is valid Date format or not [02-03-1989]
   * @param {*} value
   */
  isValiDate: function (value) {
    const regEx =
      /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
    if (!value) {
      return false;
    }
    if (regEx.test(value)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * Date To Normal Month
   * @param {*} value
   */
  changeDateFormat: function formatDDMMM(s) {
    var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    var b = s.split(/\D/);
    return b[2] + ' ' + months[b[1] - 1] + ' ' + b[0];
  },

  /**
   * Validate user's first name
   * @param {*} value
   * @return object
   */
  validateName: function (value) {
    if (this.isEmpty(value)) {
      return {
        status: false,
        message: 'First Name is required',
      };
    }

    if (!this.isValidName(value)) {
      return {
        status: false,
        message: 'Please enter alphabet',
      };
    }

    if (!this.isValidRange(value, 3, 50)) {
      return {
        status: false,
        message: 'First Name should be 3 to 50 characters in length',
      };
    }

    return {
      status: true,
      message: '',
    };
  },

  /**
   * Validate Date in DD-MM-YYYY format
   * @param {*} value
   * return Boolean true|false
   */
  validateDate: function (value) {
    if (value === undefined) {
      return {
        status: false,
        message: 'Please enter your date of birth',
      };
    }
    if (this.isEmpty(value)) {
      return {
        status: false,
        message: 'Please enter your date of birth',
      };
    }
    if (!this.isValiDate(value)) {
      return {
        status: false,
        message:
          'Invalid date format. Please enter date of birth in DD-MM-YYYY',
      };
    }

    return {
      status: true,
      message: '',
    };
  },

  /*
   * [numberWithCommasInDecimal format the coins added commas]
   * @param {num decimal}
   * @return {two decimal string with formated coins}
   */
  numberWithCommasInDecimal: function (num) {
    num = parseFloat(num).toFixed(4);
    let str = num.toString();
    let result = str.substring(0, str.indexOf('.') + 3);
    result = parseFloat(result).toFixed(2);
    return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /*
   * [nFormatter format the steps]
   * @param {num decimal}
   * @return {decimal number with formated}
   */
  // nFormatter: function (num) {
  //   if (num >= 1000000000) {
  //     return roundedToFixed(num / 1000000000, 10) + 'G'
  //   }
  //   if (num >= 1000000) {
  //     return roundedToFixed(num / 1000000, 10) + 'M'
  //   }
  //   if (num >= 1000) {
  //     return roundedToFixed(num / 1000, 10) + 'K'
  //   }
  //   return num
  // }

  roundedToFixed: function (digits, unit) {
    var decimals = digits - Math.floor(digits);
    return Math.floor(digits) + '.' + Math.floor(decimals * unit);
  },
  // Date format
  //   dateFormat: function (date, time = false) {
  //     if (!date) {
  //       return 'N/A'
  //     }
  //     const dateObject = moment(date)
  //     return dateObject.format(`DD MMM, YYYY ${time ? 'hh:mm a' : ''}`)
  //   }
};
export default Util;
