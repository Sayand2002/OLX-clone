import { useRef, useState, useContext } from "react";
import { FirebaseContext } from "../../store/firebaseContext";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import ToastContainerWrapper from "../Toast/Toast";
import showToast from "../Toast/showToastMessage";

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    const { auth } = useContext(FirebaseContext);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const inpEmail = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateInp(inpEmail, emailRegex, emailRef, setEmail);
    }
    const handlePasswordChange = (e) => {
        const inpPassword = e.target.value
        const passwordRegex = /^.{6,}$/; 
        validateInp(inpPassword, passwordRegex, passwordRef, setPassword);
    }

    const validateInp = (inpVal, regx, ref, setState) => {
        if(inpVal.trim() != null && !regx.test(inpVal)){
            ref.current.style.opacity = "1";
            setTimeout(() => {
                ref.current.style.opacity = "0";
            }, 3000);
        } else {
            ref.current.style.opacity = "0";
        }
        setState(inpVal);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        const isPasswordValid = /^.{5,}$/.test(password.trim());

        emailRef.current.style.opacity = isEmailValid ? "0" : "1";
        passwordRef.current.style.opacity = isPasswordValid ? "0" : "1";

        if(isEmailValid && isPasswordValid){
            try {
                const data = await signInWithEmailAndPassword(auth, email, password);
                if(data){
                    showToast("Login Successful.", "success", () => {
                        navigate("/");
                    })
                }
            } catch (error) {
                if(error.code == "auth/invalid-credential"){
                    showToast("Invalid Credentials...", "error");
                }
                showToast("Something went wrong! Try again..", "error");
            }
        }
    }
    return(
        <div className="login">
            <div className="login-container">
            <img src="../src/assets/signup-img.png" alt="sorry" width={"50%"} className="" />
                <h1 className="text-center text-3xl pb-5 font-semibold">LOGIN HERE</h1>
                <form className="flex flex-col gap-6" onSubmit={(e) => {handleSubmit(e)}}>
                    <span className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => {handleEmailChange(e)}} />
                        <p ref={emailRef} className="text-red-700 opacity-0">Invalid email format or email cannot be blank !</p>
                    </span>
                    <span className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={(e) => {handlePasswordChange(e)}} />
                        <p ref={passwordRef} className="text-red-700 opacity-0">Password should be atleast 5 characters !</p>
                    </span>
                    <span className="flex flex-col gap-4 pt-1">
                        <ToastContainerWrapper/>
                        <button className="login-btn">LOGIN</button>
                        <Link className=" text-center" to={'/signup'}>
                            <button>Signup</button>
                        </Link>
                        
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login;