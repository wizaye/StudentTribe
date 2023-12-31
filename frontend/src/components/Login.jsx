import React,{useEffect} from 'react'
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import sharevideo from '../assets/production.mp4'
import logo from '../assets/logo-no-background.png'
import { client } from '../client'
import {gapi} from 'gapi-script'
const Login = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        ClientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: '',
      })
    }
    gapi.load('client:auth2', start)})
    const navigate = useNavigate();

    const responseGoogle = (response) => {
    
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    
    const doc = {
      _id: response.profileObj.googleId,
      _type: 'user',
      userName: response.profileObj.name,
      image: response.profileObj.imageUrl,
    };
    
    client.createIfNotExists(doc).then(() => {
      navigate('/home', { replace: true });
    });
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={sharevideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width="300px" alt="logo" />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
            
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type='button'
                  className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer ouline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className='mr-4' />Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />

          </div>
        </div>


      </div>
    </div>
  )
}

export default Login