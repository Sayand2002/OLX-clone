import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Suspense, lazy, useContext, useEffect } from 'react';
import { AuthContext } from './store/AuthContext';
import { FirebaseContext } from './store/firebaseContext';
import { onAuthStateChanged } from 'firebase/auth';

const Home = lazy(() => import('./pages/Home'));
const SignupPage = lazy(() => import('./pages/Signup'))
const UserLogin = lazy(() => import('./pages/Login'));
const Product = lazy(() => import('./pages/Product'));
const Sellitems = lazy(() => import('./pages/Selltems'));

function App() {
    const { setUser } = useContext(AuthContext);
    const { auth } = useContext(FirebaseContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
    }, [auth, setUser]);

    const loadingSymbol =  (
            <div className=" absolute top-0 left-0 h-full w-full opacity-50 z-20 bg-black flex justify-center items-center">
                <iframe src="https://giphy.com/embed/3o7bu3XilJ5BOiSGic" width="50" height="50" frameBorder="10" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/youtube-loading-gif-3o7bu3XilJ5BOiSGic"></a></p>
            </div>)

    return (
        <Router>
            <Suspense fallback={loadingSymbol}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/sellitem" element={<Sellitems />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
