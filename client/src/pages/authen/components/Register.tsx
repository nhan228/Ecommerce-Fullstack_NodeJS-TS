import React, { useState } from 'react';
import api from '@services/apis';
import { useDispatch } from 'react-redux';
import { userAction } from '@slices/user.slice';
import { Modal } from 'antd';

export default function Register({ containerRef }) {
    {/* Init */ }
    const dispatch = useDispatch();
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [disableButton, setDisableButton] = useState(true);

    {/* Regex */ }
    const emailRegex = /^[^\W\d\.-_]+\w\d?@[a-z0-9]+\.([a-z0-9]{2,6})(\.[a-z0-9]{2,6})?$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,}$/;

    {/* Validate */ }
    // username
    const validateUsername = () => {
        const usernameInput = document.getElementsByName('username')[0];
        const username = usernameInput.value;
        if (!username.trim()) {
            setUsernameError('*Vui lòng nhập tên người dùng');
        } else {
            setUsernameError('');
        }
        setDisableButton(usernameError || emailError || passwordError || confirmPasswordError);
    };

    // email
    const validateEmail = () => {
        const emailInput = document.getElementsByName('email')[0];
        const email = emailInput.value;

        if (!emailRegex.test(email)) {
            setEmailError('*Hãy nhập đúng định dạng Mail và không được bỏ trống');
        } else {
            setEmailError('');
        }
        setDisableButton(usernameError || emailError || passwordError || confirmPasswordError);
    };

    // password and confirm-password  
    const validateConfirmPassword = () => {
        const password = document.getElementsByName('password')[0].value;
        const confirmPassword = document.getElementsByName('confirm_password')[0].value;

        if (!passwordRegex.test(password)) {
            setPasswordError('*Mật khẩu phải có ít nhất 1 ký tự viết hoa, 1 ký tự viết thường, 1 số và 1 ký tự đặc biệt');
        } else {
            setPasswordError('');
        }

        if (password != confirmPassword) {
            setConfirmPasswordError('*Mật khẩu không trùng khớp');
        } else {
            setConfirmPasswordError('');
        }
        setDisableButton(usernameError || emailError || passwordError || confirmPasswordError);
    };

    {/* eyes */ }
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };

    {/* Handel Register */ }
    async function handleRegister(e) {
        e.preventDefault();

        validateConfirmPassword();

        if (passwordError || confirmPasswordError) {
            return;
        }

        try {
            let newUser = {
                userName: e.target.username.value,
                email: e.target.email.value,
                password: showPassword ? e.target.password.value : e.target.confirm_password.value,
            };

            let result = await api.authen.register(newUser);
            Modal.success({
                title: 'Thông báo',
                content: result.data.message,
                onOk: () => {
                    containerRef.current.classList.remove('sign-up__Mode-active');
                    setDisableButton(true);
                    setUsernameError('');
                    setEmailError('');
                    setPasswordError('');
                    setConfirmPasswordError('');
                    setShowPassword(false);
                    setShowConfirmPassword(false);
                    dispatch(userAction.setData(null));
                    e.target.reset();
                },
            });
        } catch (err) {
            Modal.error({
                title: 'Lỗi !!!',
                content: err.response.data.message,
            });
        }
    }

    return (
        <>
            {/* Register Form */}
            <form className="sign-up__form" onSubmit={(e) => handleRegister(e)}>
                {/* Form Title */}
                <h1 className="form__title">REGISTER</h1>
                {/* End Register Form */}

            {/* Inputs Groups */}
                {/* username */}
                <div className="input__group">
                    <label className="field">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={validateUsername}
                            onBlur={validateUsername}
                        />
                    </label>
                    <span className="input__icon">
                        <i className="bx bx-user" />
                    </span>
                    <small className="input__error_message">{usernameError}</small>
                </div>

                {/* email */}
                <div className="input__group">
                    <label className="field">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={validateEmail}
                            onBlur={validateEmail}
                        />
                    </label>
                    <span className="input__icon">
                        <i className="bx bx-at" />
                    </span>
                    <small className="input__error_message">{emailError}</small>
                </div>

                {/* password */}
                <div className="input__group">
                    <label className="field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            onChange={validateConfirmPassword}
                            onBlur={validateConfirmPassword}
                        />
                    </label>
                    <span className="input__icon">
                        <i className="bx bx-lock" />
                    </span>
                    <span className="showHide__Icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <i className="bx bx-show" /> : <i className="bx bx-hide" />}
                    </span>
                    <small className="input__error_message">{passwordError}</small>
                </div>

                {/* confirm password */}
                <div className="input__group confirm__group">
                    <label className="field">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirm_password"
                            placeholder="Confirm Password"
                            onChange={validateConfirmPassword}
                            onBlur={validateConfirmPassword}
                        />
                    </label>
                    <span className="input__icon">
                        <i className="bx bx-lock" />
                    </span>
                    <span className="showHide__Icon" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? <i className="bx bx-show" /> : <i className="bx bx-hide" />}
                    </span>
                    <small className="input__error_message">{confirmPasswordError}</small>
                </div>
            {/* End Inputs Groups */}

            {/* Register Button */}
                <button type="submit" className="submit-button" disabled={disableButton}>
                    SIGN UP
                </button>
            {/* End Register Button */}
            </form>
            {/* End Register Form */}
        </>
    );
}
