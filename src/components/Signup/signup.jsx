import { useCallback, useContext, useRef, useState } from "react";
import { FirebaseContext } from "../../store/firebaseContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import showToast from "../Toast/showToastMessage";
import ToastContainerWrapper from "../Toast/Toast";


const Signup = () => {
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ password, setPassword ] = useState("");

    const usernameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const { db, auth } = useContext(FirebaseContext);


    const handleUsernameChange = useCallback((e) => {
        const inputValue = e.target.value;
        const usernameRegex = /^.+$/;
        validateInput(inputValue, usernameRef, setUsername, usernameRegex);
    },[setUsername])

    const handlePasswordChange = useCallback((e) => {
        const inputValue = e.target.value;
        const passwordRegex = /^.{6,}$/; 
        validateInput(inputValue, passwordRef, setPassword, passwordRegex);
    }, [setPassword])

    const handleEmailChange = useCallback((e) => {
        const inputValue = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateInput(inputValue, emailRef, setEmail, emailRegex);
    }, [setEmail])

    const handlePhoneChange = useCallback((e) => {
        const inputValue = e.target.value;
        const phoneRegex = /^\d{10}$/;
        validateInput(inputValue, phoneRef, setPhone, phoneRegex);
    }, [setPhone])

   const validateInput = (inputValue, ref, setState, regex) => {
        if (inputValue.trim() === "" || !regex.test(inputValue)) {
            ref.current.style.opacity = "1";
            setTimeout(() => {
                ref.current.style.opacity = "0";
            }, 3000);
        } else {
            ref.current.style.opacity = "0";
        }
        setState(inputValue);
    }
    
    const handleSubmit = useCallback(async () => {
        const isUsernameValid = /^(.+)$/.test(username.trim());
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        const isPhoneValid = /^\d{10}$/.test(phone.trim());
        const isPasswordValid = /^.{5,}$/.test(password.trim());
    
        usernameRef.current.style.opacity = isUsernameValid ? "0" : "1";
        emailRef.current.style.opacity = isEmailValid ? "0" : "1";
        phoneRef.current.style.opacity = isPhoneValid ? "0" : "1";
        passwordRef.current.style.opacity = isPasswordValid ? "0" : "1";

        if (isUsernameValid && isEmailValid && isPhoneValid && isPasswordValid) {
            try {
                const userData = await createUserWithEmailAndPassword(auth, email, password);
                const user = userData.user;
                updateProfile(user, {displayName: username});

                const userCollection = collection(db, "user");
                const data = {
                id: user.uid,
                username: username,
                phone: phone,
                }
                await addDoc(userCollection, data);


                if(user){
                    showToast("Signup successfull...", "success", () => {
                        navigate("/login");
                    });
                }

            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    showToast("Email already exist!", "error");
                } else if (error.code === "auth/invalid-email") {
                    emailRef.current.style.opacity = "1";
                } else if (error.code === "auth/weak-password") {
                    passwordRef.current.style.opacity = "1";
                } else {
                    alert(error);
                }
            }
        }
        setTimeout(() => {
            usernameRef.current.style.opacity = "0";
            emailRef.current.style.opacity = "0";
            phoneRef.current.style.opacity = "0";
            passwordRef.current.style.opacity = "0";
        }, 3000);
    }, [auth, db, username, password, phone, email, navigate])

    return (
        <div className="signup-container relative">
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
                        <p ref={phoneRef} className="text-red-700 opacity-0">Phone cannot be blank or invalid formate !</p>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={(e) => { handlePasswordChange(e) }} />
                        <p ref={passwordRef} className="text-red-700 opacity-0">Password should be atleast 5 characters !</p>
                    </li>
                    <li className="flex flex-col items-center gap-2">
                        <button className="signup-btn" onClick={handleSubmit}>
                            SIGNUP
                        </button>

                        < ToastContainerWrapper/>

                        <Link to={'/login'}>
                            <button className="signup-login-btn">Login</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Signup;
