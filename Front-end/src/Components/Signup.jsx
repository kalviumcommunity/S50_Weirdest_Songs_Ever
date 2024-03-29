import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import LogoW from '../../assets/WSLogowhite.png'
import Cookies from 'js-cookie';
import axios from 'axios';

function Signup() {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [signupStatus, setSignupStatus] = useState(null); 

    const navigate = useNavigate();
    const checkPassword = watch('password', '');

    const onSubmit = data => {
        const { username, email, password, repeatPassword } = data;
        axios.post('https://s50-weirdest-songs-ever-1.onrender.com/users', { username, email, password, repeatPassword })
            .then(response => {
                console.log(response);
                const { userData, token } = response.data;
                Cookies.set('userData', JSON.stringify(userData));
                Cookies.set('token', token, { expires: 1 });
                setIsSubmitted(true);
                setSignupStatus('success'); 
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            })
            .catch(error => {
                console.error(error);
                setIsSubmitted(true);
                setSignupStatus('failure');
            });
    };

    return (
        <div className="">
            <nav className="nav  flex justify-center items-center border  ">
                <img className='logo h-10' src={LogoW} alt="" />
            </nav>
            <div className="form-main   flex flex-col justify-center items-center ">

                <center>
                    <form className="" onSubmit={handleSubmit(onSubmit)}>

                        {isSubmitted && signupStatus === 'success' && (
                            <div className="pop p-3 bg-green-500 text-white  rounded mb-5"><p className="registered-heading">Account created successfully</p></div>
                        )}

                        {isSubmitted && signupStatus === 'failure' && (
                            <div className="pop p-3 bg-red-500 text-white  rounded mb-5"><p className="registered-heading">Failed to create account</p></div>
                        )}

                        <h2 className="register-head">Create an Account</h2>

                        <label htmlFor="username">User name</label>
                        <input className="form-input" {...register('username', {
                            required: 'This Field is required',
                            minLength: { value: 5, message: 'Minimum 5 characters are required' },
                            maxLength: { value: 10, message: 'Maximum length is 10 characters' }
                        })} placeholder="Create your User Name" id="username" />
                        <br />
                        {errors.username && <span className="error-span">{errors.username.message}</span>}

                        <label htmlFor="email">Email</label>
                        <input className="form-input" {...register('email', {
                            required: 'This Field is required',
                            pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email' },
                            minLength: { value: 4, message: 'Minimum 4 characters are required' },
                            maxLength: { value: 30, message: 'Maximum length is 20 characters' }
                        })} placeholder="Enter your Email address" id="email" />
                        <br />
                        {errors.email && <span className="error-span">{errors.email.message}</span>}

                        <label htmlFor="password">New Password</label>
                        <input className="form-input" {...register('password', {
                            required: 'This Field is required',
                            minLength: { value: 10, message: 'Minimum 10 characters are required' },
                            maxLength: { value: 20, message: 'Maximum length is 20 characters' },
                            pattern: {
                                value: /^(?=.*[!@#$%^&*])/,
                                message: 'Password must contain at least one special character',
                            }
                        })} placeholder="Enter your Password" type="password" id="password" />
                        <br />
                        {errors.password && <span className="error-span">{errors.password.message}</span>}

                        <label htmlFor="repeat-password">Re-enter the Password</label>
                        <input
                            className="form-input"
                            {...register('repeatPassword', {
                                required: 'This Field is required',
                                validate: value => value === checkPassword || 'Your Passwords do not match',
                            })}
                            placeholder="Re-enter the Password"
                            type="password"
                            id="repeatPassword"
                        />
                        <br />
                        {errors.repeatPassword && <span className="error-span">{errors.repeatPassword.message}</span>}

                        <label className="terms" htmlFor="terms">
                            <input
                                type="checkbox"
                                id="terms"
                                {...register('terms', { required: 'You must accept the terms and conditions' })}
                            />
                            &nbsp;&nbsp;Accept <span className="  underline">Terms and Conditions</span>
                        </label>
                        <br />
                        {errors.terms && <span className="error-terms" >{errors.terms.message}</span>}

                        <br />
                        <button className="submit-btn rounded">Signup</button>

                    </form>
                </center>
            </div>
        </div>
    )
}

export default Signup;
