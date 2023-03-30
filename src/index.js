import "./dutch_admin/theme/css/style.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./dutch_admin/store";
import { AuthProvider } from "./dutch_admin/provider/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={configureStore()}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </Provider>,

  // </React.StrictMode>
);

// React.createElement(MetisMenu),
//   document.getElementById('menu')

// ReactDOM.render(<MetisMenu />, document.getElementById('menu'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
