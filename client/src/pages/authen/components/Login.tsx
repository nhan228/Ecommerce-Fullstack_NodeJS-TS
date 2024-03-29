import React, { useState } from 'react';
import api from '@services/apis';
import { Modal } from 'antd';
import { loginWithGoogle } from '@services/firebase';

export default function Login() {
    {/* Init */}
    const [showPassword, setShowPassword] = useState(false);
    const [disableButton, setDisableButton] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    {/* Handle Input */}
    const handleInputChange = (e) => {
        const username = e.target.name == 'username' ? e.target.value : document.getElementById('username').value;
        const password = e.target.name == 'password' ? e.target.value : document.getElementById('password').value;
        setDisableButton(!username || !password);
    };

    {/* Handle Login */}
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = {
                loginId: e.target.username.value,
                password: e.target.password.value,
            };
            const result = await api.authen.login(data);

            localStorage.setItem('token', result.data.token);
            Modal.success({
                title: 'Thông báo',
                content: result.data.message,
                onOk: () => {
                    window.location.href = '/';
                },
            });
        } catch (err) {
            Modal.error({
                title: 'Lỗi !!!',
                content: err.response?.data.message || 'Unknown error',
            });
        }
    };

    {/* Handle Login With Google */}
    const handleLoginWithGoogle = async () => {
        try {
            const result = await loginWithGoogle();
            const data = {
                googleToken: result.user.accessToken,
                user: {
                    email: result.user.email,
                    avatar: result.user.photoURL,
                    userName: String(Math.ceil(Date.now() * Math.random())),
                    password: String(Math.ceil(Date.now() * Math.random())),
                },
            };

            const resultApi = await api.authen.loginWithGoogle(data);
            localStorage.setItem('token', resultApi.data.token);
            Modal.success({
                title: 'Thông báo',
                content: resultApi.data.message,
                onOk: () => {
                    window.location.href = '/';
                },
            });
        } catch (err) {
            Modal.error({
                title: 'Error',
                content: err.response?.data.message || 'Unknown error',
            });
        }
    };

    return (
        <>
            {/* Login Form */}
            <form className="sign-in__form" id="loginForm" onSubmit={handleLogin}>
                {/* Form Title */}
                <h1 className="form__title">Login</h1>
                {/* Alternate Login */}
                <div className="alternate-login">
                    <div className="link" onClick={handleLoginWithGoogle}>
                        <i className="bx bxl-google" />
                        <span>Google</span>
                    </div>

                    <div className="link" onClick={() => {}}>
                        <i className="bx bxl-facebook-circle" />
                        <span>Facebook</span>
                    </div>
                </div>

                {/* Inputs Groups */}
                {/* username */}
                <div className="input__group">
                    <label className="field">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username or Email"
                            onChange={handleInputChange}
                        />
                    </label>
                    <span className="input__icon">
                        <i className="bx bx-user" />
                    </span>
                    <small className="input__error_message" />
                </div>

                {/* password */}
                <div className="input__group">
                    <label className="field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                        />
                    </label>
                    <span className="input__icon">
                        <i className="bx bx-lock" />
                    </span>
                    <span className="showHide__Icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <i className="bx bx-show" /> : <i className="bx bx-hide" />}
                    </span>
                    <small className="input__error_message" />
                </div>
                
                {/* remember and forgot */}
                <div className="form__actions">
                    <label htmlFor="checkboxInput" className="remeber_me">
                        <input type="checkbox" id="checkboxInput" />
                        <span className="checkmark" />
                        <span>Remember Me</span>
                    </label>
                    <div className="forgot_password">Forgot Password?</div>
                </div>

                {/* Login Button */}
                <button type="submit" className="submit-button" id="loginSubmitBtn" disabled={disableButton}>
                    Login
                </button>
            </form>
            {/* End Login Form */}
        </>
    );
}
