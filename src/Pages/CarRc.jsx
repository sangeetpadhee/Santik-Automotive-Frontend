import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Style/CarRc.css'
import INDLOGO from '../Assets/INDLOGO.jpg'
import IndiaLogo from '../Assets/WelcomeIndia.jpg'

const CarRc = () => {
  window.scrollTo(0,0);
  const [searchValue, setSearchValue] = useState("");
  const [FontHandle, setFontHandle]= useState(false);

  const handleSearch = () => {
    if (searchValue.trim()) {
      window.location.href = `https://www.carinfo.app/rc-details/${searchValue}`;
    }
  };

  return (
    <div className="Main-Body-RC">
    <div className="containerheading">
        <div className="redbarheading"></div>
        <div className="nameheading">Car Rc Details Check Online : </div>
    </div>
    <img src={IndiaLogo} alt="" style={{height:'200px', margin:'auto'}}/>
    <div className="RC-Search">
    <div className="Number-Search-Container">
        <img src={INDLOGO} alt="" />
        <input type="text" 
        placeholder={FontHandle? " " :"Enter Vehicle Number"}
        onClick={()=> setFontHandle(true)} className={FontHandle? 'focused' : ''}
        value={searchValue}
        onChange={(e)=> setSearchValue(e.target.value.toUpperCase())}/>
    </div>
    <button onClick={handleSearch}>Search</button>
    </div>
    </div>
  );
};

export default CarRc;
