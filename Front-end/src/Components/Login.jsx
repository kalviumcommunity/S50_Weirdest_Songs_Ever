import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import LogoW from '../../assets/WSLogowhite.png'

function Login() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        const { username, email, password, repeatPassword } = data;
        // setUsers(users.data);

        // axios.post('http://localhost:3000/users', { username, email, password, repeatPassword })
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(error => {
        //     console.error(error);
        // });
        // console.log(data);
        setIsSubmitted(true);

        Cookies.set('username', username);
        Cookies.set('email', email);

        setTimeout(() => {
            navigate('/home');
        }, 1000
        )

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
                            <div className="pop p-3 bg-green-500 text-white  rounded mb-5"><p className="registered-heading">Account created successfully</p></div>
                        )}

                        <h2 className="register-head">Login to your account</h2>


                        <label htmlFor="username">User name</label>
                        <input className="form-input" {...register('username', {
                            required: 'This Field is required',
                            minLength: { value: 5, message: 'Minimum 5 characters are required' },
                            maxLength: { value: 10, message: 'Maximum length is 10 characters' }
                        })} placeholder="Create your User Name" id="username" />
                        <br />
                        {errors.username && <span className="error-span">{errors.username.message}</span>}



                        {/* <label htmlFor="email">Email</label>
                        <input className="form-input" {...register('email', {
                            required: 'This Field is required',
                            pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email' },
                            minLength: { value: 4, message: 'Minimum 4 characters are required' },
                            maxLength: { value: 30, message: 'Maximum length is 20 characters' }
                        })} placeholder="Enter your Email address" id="email" />
                        <br />
                        {errors.email && <span className="error-span">{errors.email.message}</span>} */}


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