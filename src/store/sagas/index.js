import { put, takeLatest, call ,fork} from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../services/api";
import {
  REQUEST_ALL_PATIENTS,
  EDIT_PATIENT,
  DELETE_PATIENT,
  CREATE_PATIENT,
  UPDATE_PATIENT,
  DELETE_QUIZ,
  EDIT_QUIZ,
  UPDATE_QUIZ,
  REQUEST_ALL_QUIZ,
  CREATE_QUIZ,
  RECEIVE_ALL_ANSWER,
  REQUEST_ALL_ANSWER
} from "../actionTypes";

//----------------
import  { loginWatcher } from './api';
import  { logoutWatcher } from './api';
import  { loginVerify } from './api';
//-----------------------

function* fetchDataPatients() {
  try {
    const data = yield call(api.fetchPatients);
    yield put(actions.getAllPatients(data));
  } catch (error) {
    console.log(error);
  }
}
function* editPatient(data) {
  try {
    const response = yield call(api.getPatientWithId, data.id);
    yield put(actions.EditPatientSuccess(response));
  } catch (error) {
    console.log(error);
  }
}
function* deletePatient(data) {
  try {
    yield call(api.delePatientWithId, data.id);
    yield put(actions.DeletePatientSuccess());
    const response = yield call(api.fetchPatients);
    yield put(actions.getAllPatients(response));
  } catch (error) {
    console.log(error);
  }
}
function* createPatient(data) {
  try {
    yield call(api.createPatient, data.patient);
    yield put(actions.CreatePatientSuccess());

    const response = yield call(api.fetchPatients);
    yield put(actions.getAllPatients(response));
  } catch (error) {
    console.log(error);
  }
}
function* updatePatient(data) {
  try {
    yield call(api.updatePatient, data.id, data.patient);
    yield put(actions.UpdatePatientSuccess());

    const response = yield call(api.fetchPatients);
    yield put(actions.getAllQuiz(response));
  } catch (error) {
    console.log(error);
  }
}
// FOR QUIZMAP
function* fetchDataQuiz() {
  try {
    const data = yield call(api.fetchQuizzes);
    yield put(actions.getAllQuiz(data));
  } catch (error) {
    console.log(error);
  }
}
function* getDataUserAnswer() {
  try {
    const data = yield call(api.fetchAllAnswer);
    yield put(actions.getAllUserAnswer(data));
  } catch (error) {
    console.log(error);
  }
}
function* deleteQuiz(data) {
  try {
    yield call(api.deleteQuizWithId, data.id);
    yield put(actions.deleteQuizSuccess());

    const response = yield call(api.fetchQuizzes);
    yield put(actions.getAllQuiz(response));
  } catch (error) {
    console.log(error);
  }
}

function* editQuiz(data) {
  try {
    const response = yield call(api.getQuizWithId, data.id);
    yield put(actions.EditQuizSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

function* updateQuiz(data) {
  try {
    yield call(api.updateQuiz, data.quiz._id, data.quiz);
    yield put(actions.UpdateQuizSuccess());
    const response = yield call(api.fetchQuizzes);
    yield put(actions.getAllQuiz(response));
  } catch (error) {
    console.log(error);
  }
}
function* createQuiz(data) {
  try {
    yield call(api.createQuiz, data.quiz);
    yield put(actions.CreateQuizSuccess());

    const response = yield call(api.fetchQuizzes);
    yield put(actions.getAllQuiz(response));
  } catch (error) {
    console.log(error);
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_ALL_PATIENTS, fetchDataPatients);

  yield takeLatest(EDIT_PATIENT, editPatient);
  yield takeLatest(DELETE_PATIENT, deletePatient);
  yield takeLatest(UPDATE_PATIENT, updatePatient);
  yield takeLatest(CREATE_PATIENT, createPatient);


  yield takeLatest(REQUEST_ALL_ANSWER,getDataUserAnswer);
  yield takeLatest(REQUEST_ALL_QUIZ,fetchDataQuiz);

  yield takeLatest(DELETE_QUIZ,deleteQuiz);
  yield takeLatest(CREATE_QUIZ,createQuiz)
  yield takeLatest(EDIT_QUIZ, editQuiz);
  yield takeLatest(UPDATE_QUIZ, updateQuiz);
  

  yield fork(loginWatcher);
   yield fork(logoutWatcher);
   yield fork(loginVerify);
}
