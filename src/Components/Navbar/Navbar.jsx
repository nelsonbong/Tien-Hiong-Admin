import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.png'
import navProfile from '../../assets/nav-profile.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={navlogo} alt="" width={100} height={100}/>
            <p>Tien Hiong Ent.</p>
        </div>
        <img src={navProfile} alt="" width={100} height={100}/>
    </div>
  )
}

export default Navbar