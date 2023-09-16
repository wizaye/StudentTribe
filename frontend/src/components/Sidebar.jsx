import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io'

import logo from '../assets/LogoBlack.png';
import { categories } from '../utils/data';
import { style } from '@mui/system';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';
// const categories = [
//   { name: 'CSE' },
//   { name: 'AIDS' },
//   { name: 'MECHANICAL' },
//   { name: 'CIVIL' },
// ]

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);

  }
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to='/home'
          className='flex px-5 gap my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className='w-full' />

        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/home'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            <h3>Home</h3>
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover Categories</h3>
          {categories.slice(0, categories.length).map((category) => (
            <NavLink
              to={`/home/category/${category.name}`}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} className='w-8 h-8 rounded-full shadow-sm' alt='category'/>
              {category.name}
            </NavLink>

          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`/home/user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className='w-10 h-10 rounded-full' alt='user-profile'/>
          <p>{user.userName}</p>
        
        </Link>
      )}

    </div>
  )
}

export default Sidebar