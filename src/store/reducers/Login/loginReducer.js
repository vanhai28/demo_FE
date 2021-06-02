
import { LOGIN_REQUESTING, LOGIN_FAILED, LOGIN_SUCCESS} from '../../actionTypes'
  const initialState = {
    requesting: false,
    success: false,
    errors: []
  }
  
  export function loginReducer(state=initialState, action){  
    switch(action.type){
      case LOGIN_REQUESTING:
 
        return {
          requesting: true,
          success: false,
          errors: []
        }
      case LOGIN_SUCCESS:
        return{
          requesting: false,
          success: true,
          errors: []
        }
      case LOGIN_FAILED:
        return{
          requesting: false,
          success: false,
          errors: state.errors.concat({ body: action.error.toString(), time: new Date() }),
        }
      default:
        return state
    } 
   
  }
  
  export default loginReducer