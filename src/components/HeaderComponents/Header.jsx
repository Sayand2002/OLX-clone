import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../../store/AuthContext";
import { FirebaseContext } from "../../store/firebaseContext";
import { signOut } from "firebase/auth";

const Header = () => {
    const [countryRotate, setCountryRotate] = useState(false);
    const [languageRotate, setLanguageRotate] = useState(false);
    const [profileRotate, setProfileRotate] = useState(false);

    const countryRef = useRef();
    const languageRef = useRef();
    const profileRef = useRef();

    const { user } = useContext(AuthContext);
    const { auth } = useContext(FirebaseContext);

    const navigate = useNavigate();

    const showCountries = (ref) => {
        if(countryRotate == true){
            ref.current.style.opacity = 1;
        }else{
            ref.current.style.opacity = 0;
        }
        setCountryRotate(!countryRotate);
    }
    const showlanguage = (ref) => {
        if(languageRotate == true){
            ref.current.style.opacity = 1;
        }else{
            ref.current.style.opacity = 0;
        }
        setLanguageRotate(!languageRotate);
    }
    const showProfile = (profileRef) => {
        if (profileRotate) {
            profileRef.current.style.opacity = 1;
        } else {
            profileRef.current.style.opacity = 0;
        }
        setProfileRotate(!profileRotate);
    };
    
    const userSignout = () => {
        signOut(auth);
        navigate("/login");
    }
    return(
        <header className="header">
            <div className="header-container">

                <div className="brand-logo">
                    <a href="/">
                        <svg width="48px" height="48px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path></svg>
                    </a>
                </div>

                <div className="search-boxes flex gap-5">

                    <div className="country-search relative">
                        <div className="country-search-container">
                            <span className="search-icon w-8 px-2">
                                <svg width="18px" height="18px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"></path></svg>  
                            </span>
                            <input type="text" placeholder="Country" className="country-input outline-none w-38 placeholder:text-black pl-2 font-light" onFocus={()=>{showCountries(countryRef)}}/>
                            <span className=" pt-2 pl-4">
                                <button className={`country-dropdown-btn ${countryRotate ? 'rotate' : ''}`} onClick={()=>{showCountries(countryRef)}}>
                                    <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path></svg>
                                </button>
                            </span>
                        </div>
                        <div className="country-dropdown absolute" ref={countryRef}>
                            <div className="px-4 py-3">
                                <h1 className="text-xs">POPULAR LOCATIONS</h1>
                                <span>
                                    <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M512 85.333c211.755 0 384 172.267 384 384 0 200.576-214.805 392.341-312.661 469.333v0h-142.656c-97.856-76.992-312.683-268.757-312.683-469.333 0-211.733 172.267-384 384-384zM512 170.667c-164.672 0-298.667 133.973-298.667 298.667 0 160.021 196.885 340.523 298.453 416.597 74.816-56.725 298.88-241.323 298.88-416.597 0-164.693-133.973-298.667-298.667-298.667zM512.006 298.66c94.101 0 170.667 76.565 170.667 170.667s-76.565 170.667-170.667 170.667c-94.101 0-170.667-76.565-170.667-170.667s76.565-170.667 170.667-170.667zM512.006 383.994c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path></svg>
                                    Kerala
                                </span>
                                <span>
                                    <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M512 85.333c211.755 0 384 172.267 384 384 0 200.576-214.805 392.341-312.661 469.333v0h-142.656c-97.856-76.992-312.683-268.757-312.683-469.333 0-211.733 172.267-384 384-384zM512 170.667c-164.672 0-298.667 133.973-298.667 298.667 0 160.021 196.885 340.523 298.453 416.597 74.816-56.725 298.88-241.323 298.88-416.597 0-164.693-133.973-298.667-298.667-298.667zM512.006 298.66c94.101 0 170.667 76.565 170.667 170.667s-76.565 170.667-170.667 170.667c-94.101 0-170.667-76.565-170.667-170.667s76.565-170.667 170.667-170.667zM512.006 383.994c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path></svg>
                                    Tamil Nadu
                                </span>
                                <span>
                                    <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M512 85.333c211.755 0 384 172.267 384 384 0 200.576-214.805 392.341-312.661 469.333v0h-142.656c-97.856-76.992-312.683-268.757-312.683-469.333 0-211.733 172.267-384 384-384zM512 170.667c-164.672 0-298.667 133.973-298.667 298.667 0 160.021 196.885 340.523 298.453 416.597 74.816-56.725 298.88-241.323 298.88-416.597 0-164.693-133.973-298.667-298.667-298.667zM512.006 298.66c94.101 0 170.667 76.565 170.667 170.667s-76.565 170.667-170.667 170.667c-94.101 0-170.667-76.565-170.667-170.667s76.565-170.667 170.667-170.667zM512.006 383.994c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path></svg>
                                    Punjab
                                </span>
                                <span>
                                    <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M512 85.333c211.755 0 384 172.267 384 384 0 200.576-214.805 392.341-312.661 469.333v0h-142.656c-97.856-76.992-312.683-268.757-312.683-469.333 0-211.733 172.267-384 384-384zM512 170.667c-164.672 0-298.667 133.973-298.667 298.667 0 160.021 196.885 340.523 298.453 416.597 74.816-56.725 298.88-241.323 298.88-416.597 0-164.693-133.973-298.667-298.667-298.667zM512.006 298.66c94.101 0 170.667 76.565 170.667 170.667s-76.565 170.667-170.667 170.667c-94.101 0-170.667-76.565-170.667-170.667s76.565-170.667 170.667-170.667zM512.006 383.994c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path></svg>
                                    Maharastra
                                </span>

                            </div>
                        </div>
                    </div>

                    <div className="item-search w-3/4 hover:border-cyan-400">
                        <input type="text" placeholder="Find Cars,Moblie Phones and more..." className="item-input outline-none w-38 placeholder: font-light pl-2"/>
                        <span className="search-item-icon flex justify-center items-cente w-12 h-full">
                            <button>
                                <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-o3KKi" d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z" fill="white"></path></svg>                            
                            </button>
                        </span>
                    </div>

                </div>
                <div className="flex items-center gap-2 relative" style={{width:"9rem"}}>
                    <div className="language-dropdown flex items-center gap-2 pl-4">
                        <div className=" font-semibold text-sm flex">
                            ENGLISH 
                        </div>
                        <div className="flex items-center">
                            <button className={`${languageRotate ? 'rotate' : ''}`} onClick={()=>{showlanguage(languageRef)}}>
                                <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div className="language-dropdown-list absolute top-16" ref={languageRef}>
                        <span className="flex justify-between">
                            English
                            <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M878.336 192l-537.003 547.679-195.669-199.568h-60.331v61.554l225.835 230.334h60.352l567.147-578.467v-61.533z"></path></svg>
                        </span>
                        <span>हिंदी</span>
                    </div>
                </div>
               


                <div className="buttons flex items-center w-48 gap-6">
                    {user 
                    ?  
                    <>
                        <img src="/src/assets/userAvathar.png" alt="sorry" width={"50rem"} className="relative cursor-pointer" onClick={()=>{showProfile(profileRef)}}/>

                        <div className="profile-dropdown-list absolute top-16 test-sm" ref={profileRef}>
                            <span>👨🏻‍💼&nbsp;{user.displayName}</span>
                            <span className="text-sm">👤&nbsp;{user.email}</span>
                            <span onClick={() => {userSignout()}} className=" cursor-pointer text-red-400 font-semibold"> 🚪&nbsp;logout</span>
                        </div>

                    </>
                    : 
                    <Link to={'/login'}>
                        <div className="login-link font-semibold">Login</div>
                    </Link>
                    }
                    {
                        user?
                        <Link to={"/sellitem"}>
                            <div className="sell-button flex items-center justify-center">
                                <svg width="104" height="48" viewBox="0 0 1603 768" className="_20oLV " ><g>
                                    <path className="_32cGm _3Vwmt" d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058s164.337-367.058 367.058-367.058z"></path>
                                    <path fill="#ffce32" className="_32cGm _3XfCS" d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-0.016-0.014c-69.113-54.119-108.754-131.557-108.754-212.474 0-41.070 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845-24.842 47.745-37.441 98.726-37.441 151.499 0 104.027 50.962 203.61 139.799 273.175h0.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783h-299.698z"></path>
                                    <path fill="#23e5db" className="_32cGm _1DrSr" d="M1318.522 38.596v0c-45.72-14.369-93.752-21.658-142.762-21.658h-748.511c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829v0c44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.010-97.197-67.703-154.957-85.852z"></path>
                                    <path fill="#3a77ff" className="_32cGm HKswn" d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88 0 25.235-3.772 50.26-11.214 74.363-38.348 124.311-168.398 211.129-316.262 211.129h-448.812l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498 9.572-31.009 14.423-63.162 14.423-95.559 0-98.044-43.805-190.216-123.317-259.551z"></path></g>
                                </svg>
                                <span className=" bg-white absolute flex gap-1 items-center justify-center font-semibold">
                                    <svg width="16px" height="16px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-lquEm" d="M414.898 123.739v291.218h-291.218l-97.014 97.014 97.014 97.131h291.218v291.16l97.073 97.071 97.073-97.071v-291.16h291.16l97.131-97.131-97.131-97.014h-291.16v-291.218l-97.073-97.073z"></path></svg>
                                    SELL
                                </span>
                            </div>
                        </Link>
                        :
                        <Link to={"/login"}>
                            <div className="sell-button flex items-center justify-center">
                                <svg width="104" height="48" viewBox="0 0 1603 768" className="_20oLV " ><g>
                                    <path className="_32cGm _3Vwmt" d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058s164.337-367.058 367.058-367.058z"></path>
                                    <path fill="#ffce32" className="_32cGm _3XfCS" d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-0.016-0.014c-69.113-54.119-108.754-131.557-108.754-212.474 0-41.070 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845-24.842 47.745-37.441 98.726-37.441 151.499 0 104.027 50.962 203.61 139.799 273.175h0.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783h-299.698z"></path>
                                    <path fill="#23e5db" className="_32cGm _1DrSr" d="M1318.522 38.596v0c-45.72-14.369-93.752-21.658-142.762-21.658h-748.511c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829v0c44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.010-97.197-67.703-154.957-85.852z"></path>
                                    <path fill="#3a77ff" className="_32cGm HKswn" d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88 0 25.235-3.772 50.26-11.214 74.363-38.348 124.311-168.398 211.129-316.262 211.129h-448.812l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498 9.572-31.009 14.423-63.162 14.423-95.559 0-98.044-43.805-190.216-123.317-259.551z"></path></g>
                                </svg>
                                <span className=" bg-white absolute flex gap-1 items-center justify-center font-semibold">
                                    <svg width="16px" height="16px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-lquEm" d="M414.898 123.739v291.218h-291.218l-97.014 97.014 97.014 97.131h291.218v291.16l97.073 97.071 97.073-97.071v-291.16h291.16l97.131-97.131-97.131-97.014h-291.16v-291.218l-97.073-97.073z"></path></svg>
                                    SELL
                                </span>
                            </div>
                        </Link>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;