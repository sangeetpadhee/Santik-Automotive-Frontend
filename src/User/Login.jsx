import React, { useState } from 'react';
import '../Style/login.css';
import loginimg from '../Assets/Login.png';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [FormData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = FormData;
    const ONChange = (e) => setFormData({ ...FormData, [e.target.name]: e.target.value });
    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(''); // Clear previous messages
    
        try {
            const response = await axios.post('https://santik-automotive-api.onrender.com/api/user/Login', FormData);
            console.log('API Response:', response.data); // Log the API response
            const UserDetail = response.data.user;
            sessionStorage.setItem('user', JSON.stringify(UserDetail));
            setMessageType('success');
            setMessage(response.data.message); 
    
            // Delay navigation 
            setTimeout(() => {
                navigate('/User-Detail');
                window.location.reload()
            }, 1500); // 
        } catch (error) {
            console.error('API Error:', error); 
            setMessageType('error');
            setMessage('Login failed: ' + (error.response?.data?.message || 'An error occurred'));
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <>
            <div className="Login-Main-Container">
                <div className="Login-Container">
                    <div className="Login-Upper">Welcome Back!</div>
                    <div className="Login-Letter">
                        <div className="containerheading" style={{ marginTop: '0px' }}>
                            <div className="redbarheading"></div>
                            <div className="nameheading">Please Login:</div>
                        </div>
                    </div>
                    <form onSubmit={HandleSubmit}>
                        <div className="Register-Submit-Txt">
                            <label>Email ID:</label>
                            <input type="email" placeholder='Enter Email ID' name='email' value={email} onChange={ONChange} />
                            <label>Password:</label>
                            <input type="password" placeholder='Enter Password' name='password' value={password} onChange={ONChange} />
                        </div>
                        <button className='Login-Submit' type='submit'>Submit</button>
                    </form>
                    <div className="Login-Last">
                        <p>Don't have an account? Please <Link to='/register'>Sign Up Here</Link></p>
                    </div>
                </div>

                <div className="Login-Right">
                    <div className="Login-Right-Img" style={{ backgroundImage: `url(${loginimg})` }}>
                        <div className="Login-Right-Text">
                            <h1>Glad to See You Again!</h1>
                            <h2>Log in to access your personalized dashboard where you can revisit saved searches, compare your favorite cars, stay updated with the latest automotive news, and read or share user reviews. Your feedback helps the community, and we're here to ensure your car experience is always top-notch. Let’s dive back in!</h2>
                        </div>
                    </div>
                </div>

                {isLoading && (
                    <div className="loading-overlay">
                        <div className="car-loader">
                            <div className="car">
                                <div className="car-body"></div>
                                <div className="car-window"></div>
                                <div className="wheel wheel-front"></div>
                                <div className="wheel wheel-back"></div>
                            </div>
                        </div>
                    </div>
                )}

                {message && (
                    <div className={`message ${messageType}`}>
                        {message} !
                    </div>
                )}
            </div>
        </>
    );
};

export default Login;
