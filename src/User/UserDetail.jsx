import React, { useEffect, useState } from 'react'
import '../Style/UserDetails.css'
import items from '../CarsArray/ALL-CAR-DATA'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Compressor from 'compressorjs';

const UserDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [NewProfilePic, setNewProfilePic]=useState({
        profileImg:''
    })
    const [ProfilePicChange, setProfilePicChange] = useState(false)
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const[SerachedCar, setSearchedCar] = useState([])
    const [User, setUser]=useState(null)
    const [UserFeedback, setUserFeedback]=useState([])
    const [FormDataOne, setFormDataOne] = useState({
        UserId:'',
        CarName:'',
        Feedback:''
    })
    useEffect(() => {
        const validData = sessionStorage.getItem('user');
        setMessage('')
        if (validData) {
            try {
                const parsedData = JSON.parse(validData);
                setUser(parsedData);
                setFormDataOne((prevState) => ({
                    ...prevState,
                    UserId: parsedData._id,
                }));
                HandleFeedbacks(parsedData._id);
            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
        }
    }, []);
    
    

    const{UserId, CarName, Feedback}= FormDataOne
    const ONchange = (e)=> setFormDataOne({...FormDataOne, [e.target.name]:e.target.value})

    const DeleteFeedback =async(deletid)=>{
        try{
            const deletefeed = await axios.delete(`https://santik-automotive-api.onrender.com/api/user/DeleteFeedback/${deletid}`)
            setMessageType('success');
            setUserFeedback(prevFeedbacks => prevFeedbacks.filter(feedback => feedback._id !== deletid));
            setMessage(deletefeed.data.message);
            setTimeout(()=>{
                setMessage('')
            },2000) 
        }catch(error){
        setMessageType('error');
        setMessage('unable To Delete Right Now : ' + (error.deletefeed?.data?.message || 'An error occurred'));
        console.error(error)
        setTimeout(()=>{
            setMessage('')
        },2000) 
        }
    }

    const HandleSumbit= async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const baseUrl = await axios.post(`https://santik-automotive-api.onrender.com/api/user/Feedback`, FormDataOne)
            setMessageType('success');
            setMessage(baseUrl.data.message); 
            await HandleFeedbacks(User._id);
            setFormDataOne({
                UserId: User._id,
                CarName: '',
                Feedback: '',
            });
            setTimeout(()=>{
                setMessage('')
            },2000) 
            setIsLoading(false);
        }catch (error) {
            console.error('Feedback Submission failed:', error);
            setMessageType('error');
            setMessage('Sumbit failed: ' + (error.baseUrl?.data?.message || 'An error occurred'));
            setTimeout(()=>{
                setMessage('')
            },2000) 
            setIsLoading(false);
        }
    }
    const HandleFeedbacks=async(UserId)=>{
        try{
            
           const feedbackUrl = await axios.get(`https://santik-automotive-api.onrender.com/api/user/allfeedbacks/${UserId}`)
            const allfeedback = feedbackUrl.data.feedback
            setUserFeedback(allfeedback)
            
        }catch (error) {
            console.error('Failed To Fetch :', error);
            setMessageType('error');
            setMessage(' Data Fetching failed: ' + (error.feedbackUrl?.data?.message || 'An error occurred'));
            setTimeout(()=>{
                setMessage('')
            },2000) 
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
        setFormDataOne(prevState => ({ ...prevState, CarName: name }));
        setSearchedCar([]); 
    };
    
    
    const handlenewprofile = async (e) => {
        e.preventDefault(); 
        setIsLoading(true);
        const file = NewProfilePic.profileImg;
    
        if (!file) {
            setMessageType('error');
            setMessage('No image selected');
            setTimeout(() => setMessage(''), 2000);
            return;
        }
    
        const formData = new FormData();
        formData.append('profileImg', file); 
    
        try {
            const response = await axios.patch(
                `https://santik-automotive-api.onrender.com/api/user/changeProfileImage/${User._id}`, 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const updatedUser = response.data.user; 
            // Update the user
            setUser(updatedUser);
            sessionStorage.setItem('user', JSON.stringify(updatedUser));

            setProfilePicChange(false);
            setIsLoading(false);
            setMessageType('success');
            setMessage(response.data.message);
    
            setTimeout(() => setMessage(''), 2000);
        } catch (error) {
            setIsLoading(false);
            setProfilePicChange(false);
            setMessageType('error');
            setMessage('Profile picture update failed: ' + (error.response?.data?.message || 'An error occurred'));
            console.error(error);
            setTimeout(() => setMessage(''), 2000);
           
        }
    };
    
    
    const handlenewimage = (e) => {
        const file = e.target.files[0];
        if (file) {
            new Compressor(file, {
                quality: 0.1, 
                success(result) {
                    const compressedFile = new File([result], file.name, { type: result.type });
                    setNewProfilePic({ profileImg: compressedFile }); // Store the compressed image
                },
                error(err) {
                    console.error('Image compression error:', err.message);
                }
            });
        }
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
                <div className="User-Detail-Img" style={User.profileImg?{backgroundImage:`url(${User.profileImg})`}:{backgroundImage:`url(${"https://cdn-icons-png.flaticon.com/512/3293/3293466.png"})`}}>
                <i onClick={()=> setProfilePicChange(!ProfilePicChange)}><FontAwesomeIcon icon={faPenToSquare}/></i>
                </div>
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
                    <h2><b>Car Name:</b> {feed.CarName} 
                    <i onClick={()=> DeleteFeedback(feed._id)}><FontAwesomeIcon icon={faTrashCan}/></i></h2>
                    <h3><b>Feedback :</b>{feed.Feedback}</h3>
                </div>
                ))}
            </div>):(<div>You Haven't Submit Any Feedbacks</div>)}
        </div>
        {message && (
                    <div className={`message ${messageType}`}>
                        {message} !
                    </div>
                )}
                {ProfilePicChange && (
                    <form className='user-Detail-Edit' encType="multipart/form-data" onSubmit={handlenewprofile}>
                        <label htmlFor="">Upload The Profile Pic <i onClick={()=>setProfilePicChange(false)}><FontAwesomeIcon icon={faXmark}/></i></label>
                        <input type="file" name="profileImg" className='User-Detail-Image-Upload' onChange={handlenewimage} />
                        <button className='Login-Submit' type='submit'>Upload</button>
                    </form>
                )}

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