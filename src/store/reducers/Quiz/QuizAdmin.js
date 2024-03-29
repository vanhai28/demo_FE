import * as types from "../../actionTypes";
const initState =  [];

const QuizReducer = (state = initState, action) => {
  switch (action.type) {
    case types.RECEIVE_ALL_QUIZ:
      return (state = action.data);
    case types.RECEIVE_ALL_ANSWER:
      return (state = action.data ? action.data : null);
    case types.DELETE_QUIZ_SUCCESS:
      return state;
    default:
      return state;
  }
};
export default QuizReducer;
