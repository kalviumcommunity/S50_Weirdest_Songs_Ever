import axios from 'axios'
import Cookies from 'js-cookie';
import LogoW from '../../assets/WSLogowhite.png'
import editImg from '../../assets/edit-text.png'
import personalIng from '../../assets/personalprof.png'
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom'

function Update() {

    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isEditable, setIsEditable] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        axios.delete('https://s50-weirdest-songs-ever-1.onrender.com/users/' + id)
            .then(response => {
                console.log(response)
                Cookies.remove('data');

            }).catch(err => {
                console.log(err);
            });

        Cookies.remove('token');
        Cookies.remove('userData');
        navigate('/')
    }

    useEffect(() => {
        axios.get('https://s50-weirdest-songs-ever-1.onrender.com/users/' + id)
            .then(response => {
                setUsers(response.data);
                console.log(response.data)
                setName(response.data.username)
                setEmail(response.data.email)
                setPassword(response.data.password)
            }).catch(err => {
                console.log(err);
            });
    }, []);

    const onSubmit = data => {
        const { username, email, password } = data;
        setUsers(users.data);

        axios.put('https://s50-weirdest-songs-ever-1.onrender.com/users/' + id, { username, email, password })
            .then(response => {
                console.log(response);
                const dataString = JSON.stringify(response.data);
                Cookies.set('data', dataString);
            })
            .catch(error => {
                console.error(error);
            });
        console.log(data);
        setIsSubmitted(true);
        setIsEditable(false);

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
                            <div className="pop p-3 bg-green-500 text-white  rounded mb-5"><p className="registered-heading"> Updated successfully</p></div>
                        )}

                        <h2 className="register-head">Profile</h2>

                        <div className='mt-5'>
                            <div className=" update-img text-center w-28 h-28 rounded-full flex justify-div items-center overflow-hidden">
                                <img src={personalIng} className='h-40 w-40' alt="Img" />
                            </div>
                        </div>


                        <label htmlFor="username">User name</label>
                        <input className="form-input" {...register('username', {
                            required: 'This Field is required',
                            minLength: { value: 5, message: 'Minimum 5 characters are required' },
                            maxLength: { value: 10, message: 'Maximum length is 10 characters' }
                        })} value={name} onChange={(e) => setName(e.target.value)} placeholder="Create your User Name" id="username" disabled={!isEditable} />
                        <br />
                        {/* {errors.username && <span className="error-span">{errors.username.message}</span>} */}



                        <label htmlFor="email">Email</label>
                        <input className="form-input" {...register('email', {
                            required: 'This Field is required',
                            pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email' },
                            minLength: { value: 4, message: 'Minimum 4 characters are required' },
                            maxLength: { value: 30, message: 'Maximum length is 20 characters' }
                        })} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email address" id="email" disabled={!isEditable} />
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
                        })} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" type="password" id="password" disabled={!isEditable} />
                        <br />
                        {errors.password && <span className="error-span">{errors.password.message}</span>}



                        <br />
                        <div className=' flex justify-between '>
                            <button className="submit-btn save-btn rounded" onClick={() => setIsEditable(true)}>  <img className='edit-icon h-6 w-6' src={editImg} />Edit</button>
                            <button className="submit-btn save-btn rounded" onSubmit={onSubmit}>Save</button>

                        </div>
                        <div className=''>
                            <hr className='mt-2 w-1/2 ' />
                            <button className="submit-btn delete-btn   rounded mt-2 " onClick={() => setShowDeleteConfirmation(true)} >Delete my account</button>
                        </div>

                        {showDeleteConfirmation &&
                            <div>

                                <div className="overlay"></div>
                                <div className="border delete-popup logout-popup rounded flex flex-col justify-around ">
                                    <h2 className='mb-7'>Are you sure you want to delete your account?</h2>
                                    <div>
                                        <button onClick={() => handleDelete(id)} className='py-3 px-5 mr-5 rounded bg-red-500 text-white font-bold hover:bg-red-400'>Yes</button>
                                        <button onClick={() => setShowDeleteConfirmation(false)} className='py-3 px-5 ml-5 border rounded  text-black font-bold'>No</button>
                                    </div>
                                </div>

                            </div>


                        }


                    </form>



                </center>



            </div>
        </div>
    )
}
export default Update