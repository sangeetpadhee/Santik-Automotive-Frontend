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

    const navigate = useNavigate();
    const { name, email, password } = formData;

    // Handle text input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle profile image upload and compression
    const handleImageUpload = (e) => {
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            // Prepare form data
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('password', formData.password);

            // Append profile image only if it's uploaded
            if (formData.profileImg) {
                data.append('profileImg', formData.profileImg);
            }

            // API call to register the user
            const response = await axios.post(`https://santik-automotive-api.onrender.com/api/user/Register`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const userData = response.data.user;
            sessionStorage.setItem('user', JSON.stringify(userData));

            setMessageType('success');
            setMessage(response.data.message);
            
            // Redirect after registration
            setTimeout(() => {
                navigate('/User-Detail');
                window.location.reload();
            }, 1200);

        } catch (error) {
            console.error('API Error:', error);
            setMessageType('error');
            setMessage('Registration failed: ' + (error.response?.data?.message || 'An error occurred'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="Login-Main-Container">
            <div className="Login-Right" style={{ borderRadius: '50px 0 0 50px' }}>
                <div className="Login-Right-Img" style={{ backgroundImage: `url(${loginimg})`, borderRadius: '50px 0 0 0' }}>
                    <div className="Login-Right-Text" style={{ height: '220px' }}>
                        <h1>Welcome to Your One-Stop Car Solution!</h1>
                        <h2 style={{ fontSize: '14px' }}>
                            Register now to find your perfect ride, compare top models, and explore a world of accessories. Stay in the know with the latest car news and get precise service cost estimates. But that’s not all, join our dynamic community where your voice matters. Share your car reviews and read insights from fellow enthusiasts.
                        </h2>
                    </div>
                </div>
            </div>

            <div className="Register-Container">
                <div className="Login-Letter" style={{ marginTop: '-8px' }}>
                    <div className="containerheading" style={{ marginTop: '0px' }}>
                        <div className="redbarheading"></div>
                        <div className="nameheading">Please Fill The Registration Form:</div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="Register-Submit-Txt">
                        <label htmlFor="name" style={{ marginTop: '0px' }}>Name:</label>
                        <input type="text" placeholder="Enter Full Name" name="name" value={name} onChange={handleChange} required />

                        <label htmlFor="email" style={{ marginTop: '0px' }}>Email ID:</label>
                        <input type="email" placeholder="Enter Email ID" name="email" value={email} onChange={handleChange} required />

                        <label htmlFor="password" style={{ marginTop: '0px' }}>Password:</label>
                        <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handleChange} required />
                    </div>

                    <label htmlFor="profileImg" style={{ marginTop: '0px' }}>Profile Image: (Optional)</label>
                    <input type="file" name="profileImg" onChange={handleImageUpload} className="File-Upload" />

                    <button className="Login-Submit" type="submit">Submit</button>
                </form>

                <div className="Login-Last" style={{ marginTop: '8px' }}>
                    <p>Already have an account? <Link to="/login">Login Here</Link></p>
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
    );
};

export default Register;
