import React, { useState } from 'react';
import '../Style/login.css';
import loginimg from '../Assets/NEW-WALLPAPER.png';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Compressor from 'compressorjs';

const Register = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profileImg: null
    });

    const { name, email, password } = formData;
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            new Compressor(file, {
                quality: 0.1, 
                success(result) {
                    setFormData({ ...formData, profileImg: result });
                },
                error(err) {
                    console.error('Image compression error:', err.message);
                }
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('')
        try { 

            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('password', formData.password);
            if (formData.profileImg) {
                data.append('profileImg', formData.profileImg);
            }
            
             const response = await axios.post(`https://santik-automotive-api.onrender.com/api/user/Register`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const userData = response.data.user;
            setIsLoading(false);
            sessionStorage.setItem('user', JSON.stringify(userData));
            setMessageType('success')
            setMessage(response.data.message);
            setTimeout(()=>{
            navigate('/User-Detail');
            window.location.reload()
            }, 1200)
        } catch (error) {console.error('API Error:', error); 
            setMessageType('error');
            setMessage('Login failed: ' + (error.response?.data?.message || 'An error occurred'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="Login-Main-Container">
                <div className="Login-Right" style={{ borderRadius: '50px 0 0 50px' }}>
                    <div className="Login-Right-Img" style={{ backgroundImage: `url(${loginimg})`, borderRadius: '50px 0 0 0' }}>
                        <div className="Login-Right-Text" style={{ height: '220px' }}>
                            <h1>Welcome to Your One-Stop Car Solution!</h1>
                            <h2 style={{ fontSize: '14px' }}>
                                Register now to find your perfect ride, compare top models, and explore a world of accessories. Stay in the know with the latest car news and get precise service cost estimates. But that’s not all, join our dynamic community where your voice matters. Share your car reviews and read insights from fellow enthusiasts. With personalized recommendations just for you, your dream car is within reach. Sign up and accelerate your adventure with us today!
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="Register-Container">
                    <div className="Login-Letter" style={{marginTop:'-8px'}}>
                        <div className="containerheading" style={{ marginTop: '0px' }}>
                            <div className="redbarheading"></div>
                            <div className="nameheading">Please Fill The Registration Form:</div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="Register-Submit-Txt">
                        <label htmlFor="name" style={{ marginTop: '0px' }}>Name:</label>
                        <input type="text" placeholder='Enter Full Name' name="name" value={name} onChange={onChange} />
                        <label htmlFor="email" style={{ marginTop: '0px' }}>Email ID:</label>
                        <input type="text" placeholder='Enter Email ID' name="email" value={email} onChange={onChange} />
                        <label htmlFor="password" style={{ marginTop: '0px' }}>Password:</label>
                        <input type="password" placeholder='Enter Password' name="password" value={password} onChange={onChange} />
                        </div>
                        <label htmlFor="profileImg" style={{ marginTop: '0px' }}>Profile Image:</label>
                        <input type="file" name="profileImg" onChange={handleImg} className='File-Upload' />
                        <button className='Login-Submit' type='submit'>Submit</button>
                    </form>
                    <div className="Login-Last" style={{marginTop:'8px'}}>
                        <p>Already have an account? Please <Link to='/login'><a href="">Login Here</a></Link></p>
                    </div>
                </div>
                {isLoading && (
                    <div class="loading-overlay">
                    <div class="car-loader">
                        <div class="car">
                            <div class="car-body"></div>
                            <div class="car-window"></div>
                            <div class="wheel wheel-front"></div>
                            <div class="wheel wheel-back"></div>
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
}

export default Register;
