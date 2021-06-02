import { combineReducers } from "redux";
import MapPage from "./Map/MapPage";
import MapAdmin from "./Map/MapAdmin";
import FormMap from "./Map/FormMap";
import EditPatient from "./Map/EditPatient";
import QuizAdmin from "./Quiz/QuizAdmin";
import EditQuiz from "./Quiz/EditQuiz";
import FormQuiz from "./Quiz/FormQuiz";
import loginReducer from './Login/loginReducer'
import logoutReducer from './Logout/logoutReducer'

const reducers = combineReducers({
  MapPage,
  MapAdmin,
  FormMap,
  EditPatient,
  QuizAdmin,
  EditQuiz,
  FormQuiz,
  loginReducer,
  logoutReducer
});

export default reducers;
