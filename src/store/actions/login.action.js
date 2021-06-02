import {LOGIN_REQUESTING,
    LOGIN_FAILED, 
    LOGIN_SUCCESS,
    CHECK_IS_LOGIN,
    CHECK_IS_LOGIN_FAIL,
    CHECK_IS_LOGIN_SUCCESS} from '../actionTypes'

export const  logInRequest =  (email, password) =>{
console.log('request ' + email, password);
return {
  type: LOGIN_REQUESTING,
  email, password
}
}

export const logInFail = (error)=>{
  return {
      type: LOGIN_FAILED,
      error
  }
}
export const checkIsLogin = (token, url)=>{
  return {
      type: CHECK_IS_LOGIN,
      token, url
      
  }
}
export const checkIsLoginFail = (error)=>{
  return {
      type: CHECK_IS_LOGIN_FAIL,
      error
  }
}

export const logInSuccess = (response)=>{
  return {
      type:LOGIN_SUCCESS,
      response
  }
}
export const checkIsLoginSuccess = (response)=>{
  return {
      type:CHECK_IS_LOGIN_SUCCESS,
      response
  }
}

