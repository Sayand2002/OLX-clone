import Home from './pages/Home';
import SignupPage from './pages/Signup';
import UserLogin from './pages/Login';
import Product from './pages/Product';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { useContext, useEffect } from 'react';
import { AuthContext } from './store/AuthContext';
import { FirebaseContext } from './store/firebaseContext';
import { onAuthStateChanged } from 'firebase/auth';
import Sellitems from './pages/Selltems';

function App() {
    const { setUser } = useContext(AuthContext);
    const { auth } = useContext(FirebaseContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
            } 
        })
    })

    return (
        
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />}/>
            </Routes>
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
            <Routes>
                <Route path="/login" element={<UserLogin />} />
            </Routes>
            <Routes>
                <Route path="/product" element={<Product />} />
            </Routes>
            <Routes>
                <Route path="/sellitem" element={<Sellitems />} />
            </Routes>
        </Router>
    )
}

export default App;
