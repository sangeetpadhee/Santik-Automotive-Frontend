import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Nav from './Components/Nav'
import Home from './Components/Home'
import Carnews from './Pages/Carnews'
import Newcar from './Pages/Newcar'
import Wallpaper from './Pages/Wallpaper'
import Carrendering from './Pages/Carrendering'
import Cardetail from './Pages/Cardetail'
import CarEmi from './Pages/CarEmi'
import Caracessories from './Pages/Caracessories'
import Usedcar from './Pages/Usedcar'
import CarService from './Pages/CarService'
import CarserviceDetails from './Pages/CarserviceDetails'
import Usedcardetail from './Pages/Usedcardetail'
import Caraccessoriesdetail from './Pages/Caraccessoriesdetail'
import Carcompare from './Pages/Carcompare'
import End from './Components/End'
import CarRc from './Pages/CarRc'
import Cardealer from './Pages/Cardealer'
import Login from './User/Login'
import Register from './User/Register'
import UserDetail from './User/UserDetail'
import AllCarReviews from './Pages/AllCarReviews'

const App = () => {
  const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
  return (
    <Router>
      <Nav User={user} setUser={setUser}/>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/User-Detail' element={<UserDetail User={user} setUser={setUser}/>}/>
        <Route path='/car-news' element={<Carnews/>}/>
        <Route path='/new-car' element={<Newcar/>}/>
        <Route path='/wallpaper' element={<Wallpaper/>}/>
        <Route path='/Car-Details/:id' element={<Cardetail/>}/>
        <Route path='/car-Rendering' element={<Carrendering/>}/>
        <Route path='/Emi-Calculator' element={<CarEmi/>}/>
        <Route path='/CarAccessories' element={<Caracessories/>}/>
        <Route path='/UsedCar' element={<Usedcar/>}/>
        <Route path='/Car-Service' element={<CarService/>}/>
        <Route path='/Car-Service/:serviceid' element={<CarserviceDetails/>}/>
        <Route path='/Used-Car/:carid' element={<Usedcardetail/>}/>
        <Route path='/Car-Accessories/:prodid' element={<Caraccessoriesdetail/>}/>
        <Route path='/Car-Compare' element={<Carcompare/>}/>
        <Route path='/Car-Rc-Details' element={<CarRc/>}/>
        <Route path='/Car-Dealer' element={<Cardealer/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Feedbacks' element={<AllCarReviews/>}/>
      </Routes>
      <End/>
    </Router>
  )
}

export default App