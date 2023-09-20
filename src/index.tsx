import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(

  document.getElementById('root') as HTMLElement

);

root.render(

  <React.StrictMode>

    <Auth0Provider

   domain='dev-cyihn2rsss0wi5rc.us.auth0.com'

   clientId='10F5ZQ3n3sQgCb5IB2Fi3ro3pgaNgt2I'

   authorizationParams={{redirect_uri:window.location.origin + '/dashboard'}

  }

   >

     <App />

   </Auth0Provider>

   

 

  </React.StrictMode>

);

 

// If you want to start measuring performance in your app, pass a function

// to log results (for example: reportWebVitals(console.log))

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();