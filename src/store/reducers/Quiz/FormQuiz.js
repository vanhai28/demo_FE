import * as types from "../../actionTypes";

const initState = false;
const FormQuizReducer = (state = initState, action) => {
  switch (action.type) {
    case types.TOGGLE_FORM_QUIZ:
      return !state;
    case types.SHOW_FORM_QUIZ:
      state = true;
      return state;
    case types.CLOSE_FORM_QUIZ:
      state = false;
      return state;
    default:
      return state;
  }
};
export default FormQuizReducer;
