import React, { useState } from 'react'
import "../Style/nav.css";
import { HStack, Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, theme } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import headingimg from "../Assets/SANTIK LETTERBLACK.png"
import { wrap } from 'framer-motion'
import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Nav = ({ User, setUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const firstName=(userfirstname)=>{
    return userfirstname.split(' ')[0];
  }

  const HandleLogout=()=>{
    setUser(null)
    sessionStorage.removeItem('user')
    onClose()
  }
  return (
    <>
      <div className="container">
        <div className="upper">
          <FontAwesomeIcon icon={faBars} className='menuic' onClick={onOpen} />
          <img src={headingimg} className='uppersantik' alt="" />
          <Link to='register'><FontAwesomeIcon icon={faUserPlus} className='menuic-login' /></Link>
        </div>
        <div className="border"></div>

        <Drawer isOpen={isOpen} placement='left' onClose={onClose}  >
          <DrawerOverlay />
          <DrawerContent style={{ width: '60%' }}>
            <DrawerCloseButton style={{ marginTop: '6px' }} />
            <DrawerHeader>{User ? <span>Welcome {firstName(User.name)}!</span> : "Santik Automotive"}</DrawerHeader>

            <DrawerBody>
              <div className="drawercomp">
                <Link to='/'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Home</button></Link>
                <Link to='/User-Detail'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>User Details</button></Link>
                <Link to='/new-car'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>New Car</button></Link>
                <Link to='car-news'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Car News</button></Link>
                <Link to='/Car-Compare'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Car Comparison</button></Link>
                <Link to='/wallpaper'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Wallpapers</button></Link>
                <Link to='/car-rendering'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Car Renderings</button></Link>
                <Link to='/Car-Rc-Details'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Car Rc Check</button></Link>
                <Link to='/UsedCar'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Used Car</button></Link>
                <Link to='/Emi-Calculator'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Emi Calculator</button></Link>
                <Link to='/Car-Dealer'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Car Dealers</button></Link>
                <Link to='/Car-Service'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Car Service</button></Link>
                <Link to='/CarAccessories'><button onClick={onClose} style={{textAlign:'left', width:'180px'}}>Car Accessories</button></Link>
              </div>

            </DrawerBody>

            <DrawerFooter>
              {User?(<Button colorScheme='blue' onClick={HandleLogout}>Logout</Button>):(<Link to='/login'><Button colorScheme='blue' onClick={onClose}>Login</Button></Link>)}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

export default Nav

