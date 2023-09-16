import React,{useEffect} from 'react'
import {Routes,Route,useNavigate} from 'react-router-dom'
import Login from './components/Login';
import Home from './container/Home';
import Blog from './components/Home/Blog'
import { fetchUser } from './utils/fetchUser';
import Mainpage from './demos/SaaSProductLandingPage';
import GlobalStyles from 'styles/GlobalStyles';
export default function App() {
  const navigate=useNavigate();
  useEffect(() => {
    const user=fetchUser();
    if(!user){
      navigate('/');
    }
  },[navigate]);
  
    return (
      <>
      {/* <GlobalStyles/> */}
      <Routes>
        <Route path="/" element={<Mainpage/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home/*" element={<Home/>}/>
      </Routes>
      </>
    )
  }