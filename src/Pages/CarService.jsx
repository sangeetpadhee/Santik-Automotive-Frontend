import React, { useState } from 'react'
import Search from '../Components/Search'
import ServiceData from '../CarsArray/CarServiceData'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const CarService = () => {
  window.scrollTo(0,0);
  const [Searchfilter, SetSearchFilter] = useState(ServiceData)
  const handlesearch = (e) => {
    const query = e.target.value.toLowerCase()
    const searchfil = ServiceData.filter((product) => product.name.toLowerCase().includes(query))
    SetSearchFilter(searchfil)
  }
  const resetfilter = (e) => {
    SetSearchFilter(ServiceData)
  }
  return (
    <>
      <Search placeholdername={"Search Tata Nexon.."} filterprod={handlesearch} basearr={resetfilter} />

      <div className="containerheading" style={{ margin: '15px 0px 10px 10px' }}>
        <div className="redbarheading"></div>
        <div className="nameheading">Select The Car To Get Service:</div>
      </div>

      <div className="Car-Brands-Container">
        <ul className="Car-Brands-List">
          {Searchfilter.map((car, index)=>(
          <Link to={`/Car-Service/${car.serviceid}`}><li className="Car-Brand-Item" key={index}>
            <div className="redbar" style={{height:'35px', borderRadius:'10px', marginRight:'10px'}}></div>
            {car.name} 
            <div className="Choose-Icon" 
            style={{marginLeft:'auto'}}><FontAwesomeIcon icon={faAngleRight}/></div>
            </li></Link>
          ))}
        </ul>
      </div>

    </>
  )
}

export default CarService