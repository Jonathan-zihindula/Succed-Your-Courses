import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/main.css';
import App from './App';
// import { Provider } from "react-redux";
// import store from "./state/store/store";

ReactDOM.render(
  <React.StrictMode>
     {/* <Provider store={store}> */}
      <App />
      {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

