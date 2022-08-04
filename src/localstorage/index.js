import { writeStorage, readStorage, removeAllStorage, removeStorage } from './asyncStorage'

// UserFcmToken
export const setFcmToken = async value => {
  return (promise = new Promise(function (resolve) {
    resolve(writeStorage('FCM_TOKEN', value))
  }))
}

export const getFcmToken = async () => {
  return (promise = new Promise(function (resolve) {
    resolve(readStorage('FCM_TOKEN'))
  }))
}

export const removeFcmToken = async () => {
  return (promise = new Promise(function (resolve) {
    resolve(removeStorage('FCM_TOKEN'))
  }))
}


// NotificationData
export const setNotificationData = async value => {
    return (promise = new Promise(function (resolve) {
      resolve(writeStorage('NOTIFICATION_DATA', value))
    }))
  }
  
  export const getNotificationData = async () => {
    return (promise = new Promise(function (resolve) {
      resolve(readStorage('NOTIFICATION_DATA'))
    }))
  }
  
  export const removeNotificationData = async () => {
    return (promise = new Promise(function (resolve) {
      resolve(removeStorage('NOTIFICATION_DATA'))
    }))
  }


  // Access Token
export const setAccessToken = async value => {
    return (promise = new Promise(function (resolve) {
      resolve(writeStorage('ACCESS_TOKEN', value))
    }))
  }
  
  export const getAccessToken = async () => {
    return (promise = new Promise(function (resolve) {
      resolve(readStorage('ACCESS_TOKEN'))
    }))
  }
  
  export const removeAccessToken = async () => {
    return (promise = new Promise(function (resolve) {
      resolve(removeStorage('ACCESS_TOKEN'))
    }))
  }