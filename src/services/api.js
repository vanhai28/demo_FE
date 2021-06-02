import axios from "axios";

const host = process.env.REACT_APP_COVID_API;

export const fetchPatients = async () => {
  const response = await axios.get(`${host}/api/map`);
  return response.data.patients;
};

export const delePatientWithId = async (id) => {
  return await axios.delete(`${host}/api/patient/${id}`);
};
export const getPatientWithId = async (id) => {
  const response = await axios.get(`${host}/api/patient/${id}`);
  return response.data.patient;
};

export const updatePatient = async (id, data) => {
  return await axios.put(`${host}/api/patient/${id}`, data);
};
export const createPatient = async (data) => {
  return await axios.post(`${host}/api/patient`, data);
};

export const createQuiz = async (data) => {
  return await axios.post(`${host}/api/quiz`, data);
};
export const deleteQuizWithId = async (id) => {
  return await axios.delete(`${host}/api/quiz/${id}`);
};
export const fetchQuizzes = async () => {
  const response = await axios.get(`${host}/api/quiz`);
  return response.data.QuizReponses;
};
export const fetchAllAnswer = async () => {
  const response = await axios.get(`${host}/api/useranswer`);
  return response.data.userAnswerReponses;
};
export const getQuizWithId = async (id) => {
  const response = await axios.get(`${host}/api/quiz/${id}`);
  return response.data.quiz;
};
export const updateQuiz = async (id, data) => {
  return await axios.put(`${host}/api/quiz/${id}`, data);
};