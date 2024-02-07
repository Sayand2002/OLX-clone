import Home from './pages/Home';
import SignupPage from './pages/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
    return (
        <Router basename='/olx'>
            <Routes>
                <Route path="/" element={<Home />} future={{ v7_startTransition: true }}/>
            </Routes>
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Router>
    )
}

export default App
