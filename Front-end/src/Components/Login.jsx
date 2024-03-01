import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios'

import LogoW from '../../assets/WSLogowhite.png'

function Login() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { email, password } = data;
        setIsSubmitted(true);
        axios.get('http://localhost:3000/users')
            .then(response => {
                const users = response.data;
                const matchedUser = users.find(user => user.email === email && user.password === password);

                if (matchedUser) {
                    const dataString = JSON.stringify(matchedUser);
                    Cookies.set('data', dataString);
                    Cookies.set('email', email);

                    console.log('success')
                    setTimeout(() => {
                        setIsSubmitted(true);
                        navigate('/home');
                    }, 1000);

                } else {
                    setIsSubmitted(false);
                    console.log("Invalid email or password");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };


    return (
        <div>
            <nav className="nav  flex justify-center items-center border  ">
                <img className='logo h-10' src={LogoW} alt="" />
            </nav>


            <div className="form-main   flex flex-col justify-center items-center ">


                <center>
                    <form className="" onSubmit={handleSubmit(onSubmit)}>

                        {isSubmitted && !Object.keys(errors).length && (
                            <div className="pop p-3 bg-green-500 text-white  rounded mb-5">
                                <p className="registered-heading">Login successful</p>
                            </div>
                        )}

                        <h2 className="register-head">Login to your account</h2>


                        <label htmlFor="email">Email</label>
                        <input className="form-input" {...register('email', {
                            required: 'This Field is required',
                            pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email' },
                            minLength: { value: 4, message: 'Minimum 4 characters are required' },
                            maxLength: { value: 30, message: 'Maximum length is 20 characters' }
                        })} placeholder="Enter your Email address" id="email" />
                        <br />
                        {errors.email && <span className="error-span">{errors.email.message}</span>}


                        <label htmlFor="password">Password</label>
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


                        <br />
                        <button className="submit-btn rounded">Login</button>

                    </form>



                </center>



            </div>
        </div>
    )
}

export default Login