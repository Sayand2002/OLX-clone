import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FirebaseContext } from './store/firebaseContext.jsx'
import {db, storage, auth} from './firebase/config.jsx';
import UserAuthContext from './store/AuthContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={{db, storage, auth}}>
    <UserAuthContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserAuthContext>
  </FirebaseContext.Provider>
  
)
