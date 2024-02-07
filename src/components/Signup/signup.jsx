import { useRef, useState } from "react";
import "./signup.css";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '/src/firebase/config';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const usernameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const userData = {};

    const handleUsernameChange = (e) => {
        const inputValue = e.target.value;
        handleInputChange(inputValue, usernameRef, setUsername);
    }

    const handleEmailChange = (e) => {
        const inputValue = e.target.value;
        const isValidEmail = validateEmail(inputValue);
        handleInputChangeWithValidation(inputValue, emailRef, setEmail, isValidEmail);
    }

    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        const isValidPhoneNumber = validatePhoneNumber(inputValue);
        handleInputChangeWithValidation(inputValue, phoneRef, setPhone, isValidPhoneNumber);
    }

    const handlePasswordChange = (e) => {
        const inputValue = e.target.value;
        handleInputChange(inputValue, passwordRef, setPassword);
    }

    const handleInputChange = (inputValue, ref, setState) => {
        if (inputValue.trim() === "") {
            ref.current.style.opacity = "1";
            setTimeout(() => {
                ref.current.style.opacity = "0";
            }, 3000);
        } else {
            ref.current.style.opacity = "0";
        }
        setState(inputValue);
    }

    const handleInputChangeWithValidation = (inputValue, ref, setState, isValid) => {
        if (inputValue.trim() === "" || !isValid) {
            ref.current.style.opacity = "1";
            setTimeout(() => {
                ref.current.style.opacity = "0";
            }, 3000);
        } else {
            ref.current.style.opacity = "0";
        }
        setState(inputValue);
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePhoneNumber = (phoneNumber) => {
        // Simple validation for a 10-digit numeric phone number
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }
    

    const getUserData = async () => {
        userData.name = username;
        userData.email = email;
        userData.phone = phone;
        userData.password = password;

        const userCollection = collection(db, "user");
        await addDoc(userCollection, userData);
    }

    return (
        <div className="signup-container">
            <div className="signup-div flex flex-col items-center">
                <img src="../src/assets/signup-img.png" alt="sorry" width={"50%"} className="pt-6" />
                <ul>
                    <li>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={username} onChange={(e) => { handleUsernameChange(e) }} />
                        <p ref={usernameRef} className="text-red-700 opacity-0">Username cannot be blank !</p>
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => { handleEmailChange(e) }} />
                        <p ref={emailRef} className="text-red-700 opacity-0">Invalid email format or email cannot be blank !</p>
                    </li>
                    <li>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" value={phone} onChange={(e) => { handlePhoneChange(e) }} />
                        <p ref={phoneRef} className="text-red-700 opacity-0">Phone cannot be blank !</p>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={(e) => { handlePasswordChange(e) }} />
                        <p ref={passwordRef} className="text-red-700 opacity-0">Password cannot be blank !</p>
                    </li>
                    <li className="flex flex-col items-center gap-5">
                        <button className="signup-btn" onClick={getUserData}>SIGNUP</button>
                        <button className="login-btn">Login</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Signup;
