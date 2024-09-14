import React, { useEffect, useState } from 'react'
import '../Style/UserDetails.css'
import items from '../CarsArray/ALL-CAR-DATA'
import axios from 'axios'
import { Link } from 'react-router-dom';

const UserDetail = () => {
    const[SerachedCar, setSearchedCar] = useState([])
    const [User, setUser]=useState(null)
    const [UserFeedback, setUserFeedback]=useState([])
    const [FormData, setFormData] = useState({
        UserId:'',
        CarName:'',
        Feedback:''
    })
    useEffect(() => {
        const validData = sessionStorage.getItem('user');
        if (validData) {
            try {
                const parsedData = JSON.parse(validData);
                setUser(parsedData);
                setFormData((prevState) => ({
                    ...prevState,
                    UserId: parsedData._id,
                }));
                HandleFeedbacks(parsedData._id);
            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
        }
    }, []);
    
    

    const{UserId, CarName, Feedback}= FormData
    const ONchange = (e)=> setFormData({...FormData, [e.target.name]:e.target.value})

    const HandleSumbit= async(e)=>{
        e.preventDefault();
        try{
            const baseUrl = await axios.post(`https://santik-automotive-api.onrender.com/api/user/Feedback`, FormData)
            alert(baseUrl.data.message)
            await HandleFeedbacks(User._id);
            setFormData({
                UserId: User._id,
                CarName: '',
                Feedback: '',
            });
        }catch (error) {
            console.error('Feedback Submission failed:', error);
            alert('Feedback Submission failed: ' + (error.response?.data?.message || 'An error occurred'));
        }
    }
    const HandleFeedbacks=async(UserId)=>{
        try{
            
           const feedbackUrl = await axios.get(`https://santik-automotive-api.onrender.com/api/user/allfeedbacks/${UserId}`)
            const allfeedback = feedbackUrl.data.feedback
            setUserFeedback(allfeedback)
            
        }catch (error) {
            console.error('Failed To Fetch :', error);
            alert('Failed To Fetch : ' + (error.response?.data?.message || 'An error occurred'));
        }
    }

    const firstName=(userfirstname)=>{
        return userfirstname.split(' ')[0];
    }

    const HandleLogout=()=>{
        sessionStorage.removeItem('user')
        window.location.reload()
    }


    const handlecarname = (e) => {
        const val = e.target.value.toLowerCase();
        if(val) {
            const sugg = items.filter((car) => car.name.toLowerCase().includes(val));
            setSearchedCar(sugg);
        } else {
            setSearchedCar([]);
        }
        ONchange(e); 
    };
    
    const selectCarName = (name) => {
        setFormData(prevState => ({ ...prevState, CarName: name }));
        setSearchedCar([]); 
    };
    
  return (
    <>
    {User?(
        <React.Fragment>
    <div className="User-Detail-Container">
        <div className="User-Details">
        <div className="containerheading" style={{marginTop:'10px'}}>
                <div className="redbarheading"></div>
                <div className="nameheading">Welcome {firstName(User.name)} ! </div>
        </div>
            <div className="User-Details-Container">
                <div className="User-Detail-Img" style={{backgroundImage:`url(${User.profileImg})`}}></div>
                <div className="User-Info-Below-Img">
                <h1>{User.name}</h1>
                <h2>{User.email}</h2>
                </div>
            </div>
            <button onClick={HandleLogout}>Logout</button>
        </div>
        <div className="User-Feedback">
            <div className="User-Feedback-Container"> 
                <div className="User-Feedback-header">Feel Free To Join The Review Gang </div>
                <div className="Upper-User-Feedback">
                <div className="containerheading" style={{marginTop:'0px'}}>
                <div className="redbarheading"></div>
                <div className="nameheading">Fill The Details : </div>
                </div>
                </div>
                <form onSubmit={HandleSumbit}>
                <label htmlFor="">Car Name :</label>
                <input type="text" placeholder='Enter Car Name' name='CarName' value={CarName} onChange={handlecarname} />
                <div className="Car-Name-Main-Container">
                {SerachedCar.length > 0 && SerachedCar.map((car, index) => (
                <div className="Car-Name-Container" key={index} onClick={() => selectCarName(car.name)}>
                {car.name}
                </div>
                ))}
                </div>
                
                <label htmlFor="">Your Review :</label>
                <input type="text" placeholder='Enter Your feedback' name='Feedback' value={Feedback} onChange={ONchange} style={{height:'120px'}}/>
                <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    </div>
    <div className="User-All-Feedback">
        <div className="containerheading" style={{margin:'50px 0 0 5px'}}>
                <div className="redbarheading"></div>
                <div className="nameheading">Your Feedbacks : </div>
            </div>
            {UserFeedback.length > 0?(
            <div className="User-All-Feedback-Container">
                {UserFeedback.map((feed, index)=>(
                <div className="Each-Feedback-Container" key={index}>
                    <h2><b>Car Name:</b> {feed.CarName}</h2>
                    <h3><b>Feedback :</b>{feed.Feedback}</h3>
                </div>
                ))}
            </div>):(<div>You Haven't Submit Any Feedbacks</div>)}
        </div>
        </React.Fragment>
        ):(
                <div className="Please-Login">
                <h6>Please Login To View Your Feedback !</h6>
                <Link to='/login'><button className="login-button">Login</button></Link>
                </div>
            )}
    </>
  )
}

export default UserDetail