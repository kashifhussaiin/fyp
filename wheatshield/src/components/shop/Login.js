import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./constants";
import '../main.css'

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = () => {
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        // Update the login state to true
                        setIsLogin(true);
                        // Redirect or navigate to the desired page
                        navigate('/mainly');
                    }
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    };
    

    const handleSignup = () => {
        const url = API_URL + '/signup';
        const data = { username, password, email ,mobile};
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                    // Optionally, you could automatically switch to login after successful signup
                    setIsLogin(true);
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    };

    return (
        <div>
            <div className="formshop">
                {isLogin ? (
                    <>
                        <h2>Login</h2>
                        <input type="email" name="email" placeholder="Enter Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="btnn" onClick={handleLogin}>Login</button>
                        <p className="link">No account? <a href="#" onClick={() => setIsLogin(false)}>Sign up</a> here</p>
                    </>
                ) : (
                    <>
                        <h2>Sign Up</h2>
                        <input type="text" name="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" name="mobile" placeholder="Enter Mobile" value={mobile} onChange={(e) => setmobile(e.target.value)} />
                        <input type="email" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="btnn" onClick={handleSignup}>Sign Up</button>
                        <p className="link">Have account? <a href="#" onClick={() => setIsLogin(true)}>Login</a> here</p>
                    </>
                )}
               {/* <p className="liw">Log in with</p>*/}
                <div className="icons">
                    <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-google"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-skype"></ion-icon></a>
                </div>
            </div>
        </div>
    );
};


