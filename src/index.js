import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore } from 'redux';
//액션 타입 정의
const ADD_HISTORY = 'ADD_HISTORY';
const REMOVE_HISTORY = 'REMOVE_HISTORY';

const initial = {
  goalcount: 10000,
  donecount: 0,
  recordcount: 0,
  history: []
}
//액션 생성 함수 만들기
const addHistory = (text) => {
  return {
    type: ADD_HISTORY,
    payload: text
  }
}
const removeHistory = (index) => {
  return {
    type: REMOVE_HISTORY,
    payload: index
  }
}


function reducer(state = initial, action) {
  switch (action.type) {
    case 'save':
      return state = {
        ...state,
        goalcount: state.goalcount - action.payload.recordcount,
        history: [...state.history, action.payload.recordcount]
      }
    case 'add':
      return {
        ...state,
        history: [...state.history, action.payload]
      }
    case 'remove':
      return {
        ...state, history: state.history.filter((todo, index) => index !== action.payload)
      }
    default:
      return state;
  }

}



let store = createStore(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

