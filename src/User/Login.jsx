import React, { useState } from 'react'
import '../Style/login.css'
import loginimg from '../Assets/Login.png'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const[FormData, setFormData]= useState({
        email:'',
        password:''
    })
    const {email, password} = FormData
    const ONChange=(e)=> setFormData({...FormData, [e.target.name]: e.target.value})

    const navigate = useNavigate()
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        try{        
        const baseUrl = await axios.post(`https://santik-automotive-api.onrender.com/api/user/Login`, FormData)
        const UserDetail = baseUrl.data.user;
        setIsLoading(false)
        sessionStorage.setItem('user', JSON.stringify(UserDetail))
        alert(baseUrl.data.message)
        navigate('/User-Detail')
        window.location.reload()
       }catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: ' + (error.response?.data?.message || 'An error occurred'));
            }
    }

    return (
        <>
            <div className="Login-Main-Container">
                    <div className="Login-Container">
                        <div className="Login-Upper">Welcome Back !</div>
                        <div className="Login-Letter">
                            <div className="containerheading" style={{marginTop:'0px'}}>
                                <div className="redbarheading"></div>
                                <div className="nameheading">Please Login : </div>
                            </div>
                        </div>
                        <form onSubmit={HandleSubmit}>
                        <div className="Register-Submit-Txt">
                            <label htmlFor="">Email ID :</label>
                            <input type="email" placeholder='Enter Email ID' name='email' value={email} onChange={ONChange} />
                            <label htmlFor="">Password :</label>
                            <input type="password" placeholder='Enter Password' name='password' value={password} onChange={ONChange}/>
                        </div>
                        <button className='Login-Submit' type='submit'>Submit</button>
                        </form>
                        <div className="Login-Last">
                            <p>Don't have an account? Please <Link to='/register'><a href="">Sign Up Here</a></Link> </p>
                        </div>
                    </div>
                    
                <div className="Login-Right">
                    <div className="Login-Right-Img" style={{ backgroundImage: `url(${loginimg})` }}>
                    <div className="Login-Right-Text">
                        <h1>Glad to See You Again!</h1>
                        <h2>Log in to access your personalized dashboard where you can revisit saved searches, compare your favorite cars, stay updated with the latest automotive news, and read or share user reviews. Your feedback helps the community, and we're here to ensure your car experience is always top-notch. Let’s dive back in!</h2></div>
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
            </div>
        </>
    )
}

export default Login