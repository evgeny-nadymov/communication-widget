import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Widget from './Widget/Widget';
// import reportWebVitals from './reportWebVitals';
import params from './Widget/params.json';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Widget params={params} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
