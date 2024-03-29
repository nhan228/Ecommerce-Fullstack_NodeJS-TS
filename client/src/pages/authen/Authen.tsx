import React, { useRef } from 'react';
import pictures from '@/pictures'
import Register from './components/Register';
import Login from './components/Login';

import './authen.scss';

export default function Authen() {
  const containerRef = useRef();

  return (
    <>
      {/* Wrapper Area */}
      <div className="wrapper__area" id="wrapper_Area" ref={containerRef}>
        <div className="forms__area">
          <Register containerRef={containerRef} />
          <Login />

          {/* Back to Home Page Button */}
          <button className="backToHome" onClick={() => { window.location.href = '/'; }} id="backToHomeBtn">
            <svg
              className="svgicon"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              style={{ fill: "rgba(0, 0, 0, 1)", transform: "", msfilter: "" }}
            >
              <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"></path>
            </svg>
          </button>
        </div>
        {/* End Forms Area */}

        {/* Aside Area */}
        <div className="aside__area" id="aside_Area">
          <div className="login__aside-info">
            <h4>Welcome Back!</h4>
            <img src={pictures.authen} alt="Image" />
            <p>To keep connected with us, please login with your personal info !</p>
            <button onClick={() => {
              containerRef.current.classList.add('sign-up__Mode-active');
            }} id="aside_signUp_Btn">
              Register
            </button>
          </div>
          <div className="sign-up__aside-info">
            <h4>Welcome! </h4>
            <img src={pictures.authen} alt="Image" />
            <p>Enter your personal details and start the journey with us ^^</p>
            <button onClick={() => {
              containerRef.current.classList.remove('sign-up__Mode-active');
            }} id="aside_signIn_Btn">
              Login
            </button>
          </div>
        </div>
      </div>
      {/* End Wrapper Area */}
    </>
  );
}
