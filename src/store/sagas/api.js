import { LOGIN_REQUESTING, LOGIN_FAILED, LOGIN_SUCCESS,LOGOUT_REQUESTING, 
  CHECK_IS_LOGIN, CHECK_IS_LOGIN_FAIL} from '../actionTypes';
import { takeLatest, put, call } from 'redux-saga/effects'
import forwardTo from '../history'

const host = process.env.REACT_APP_COVID_API;

const urlPostLogin = `${host}/login`;
const urlPostLogout = `${host}/logout`;
const urlPostVerify = `${host}/verify`;

async function  postLoginRequest (email, password)
{
 var respon ;
   await  fetch(urlPostLogin, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ email, password })
 })
 .then(response => {respon =  response.json()})
 .then(json => json)
 .catch((error) => { throw error }) 
 
 return respon;
}

function* loginFlow (action) {
   const { email, password } = action
   try {
     var response =  yield call(postLoginRequest, email, password)
        if(response.status === 200){
         localStorage.setItem("token", response.token)
         yield forwardTo('/admin');  
         put({ type: LOGIN_SUCCESS, response });
      }
      else {
       put({ type: LOGIN_FAILED, response })
      }     
    
   } catch(error){
     yield put({ type: LOGIN_FAILED, error })
   }
 }

 export function* loginWatcher(){
   yield takeLatest(LOGIN_REQUESTING, loginFlow)
 }

function* getLogOutRequest (action)
{
   yield  fetch(urlPostLogout, {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json',
     'Authorization': 'Beare ' + action.token
   },
    
 })
 .then((response)=>{
     localStorage.removeItem("token");
     localStorage.setItem("isLogin", false);
     forwardTo('/login');
 })
 .catch((error) => { 
   put({ type: LOGIN_FAILED, error })
   throw error 
 }) 

}

 export function* logoutWatcher(){
   yield takeLatest(LOGOUT_REQUESTING, getLogOutRequest)
 }


 export function* verifyRequest (action)
 {
   yield fetch(urlPostVerify, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Beare ' + action.token
     },
      
   })
   .then((response)=>{
     
     if(response.status === 200){  
       localStorage.setItem("isLogin", true);

       if (action.url.includes('/login')) {
        forwardTo('/admin');
       }
       else {     
        forwardTo(action.url);
       }
      
     }
     else {

       if(window.location.pathname.includes('/admin')){
        forwardTo('/login');
       }
       else {
        forwardTo(action.url);
       }
     }

   })
   .catch((error) => { 
     put({CHECK_IS_LOGIN_FAIL, error});
     throw error }) 
 
 }
 export function* loginVerify(){
   yield takeLatest(CHECK_IS_LOGIN, verifyRequest )
 }