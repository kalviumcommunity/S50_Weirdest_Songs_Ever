import LogoW from '../../assets/WSLogowhite.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

function Create() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false); // State to manage modal visibility
    const cookieUserData = Cookies.get('userData');
    const userData = cookieUserData ? JSON.parse(cookieUserData) : null;
    const navigate = useNavigate();

    const handleInfoModalToggle = () => {
        setShowInfoModal(!showInfoModal);
    };


    const onSubmit = data => {
        const { songTitle, artist, releaseYear, imageVideo, genre } = data;
        console.log(songTitle, userData.username, artist, releaseYear, genre, imageVideo);

        axios.post('http://localhost:3000/posts', { songTitle, username: userData.username, artist, releaseYear, imageVideo, genre })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });

        setIsSubmitted(true);

        setTimeout(() => {
            navigate('/home');
        }, 1000);
    };

    return (
        <div>

            <nav className="nav h-20 flex justify-center items-center border">
                <img className='logo h-10' src={LogoW} alt="" />
            </nav>

            <div className="panels flex justify-around ">
                <div className='left-panel m-12 '>
                    <div className="add-post flex justify-between items-center ">
                        <Link to='/create'>
                            <div className="add-btn  w-16 h-16 rounded-full">
                                <button
                                    className="plus rounded-full text-white text-md cursor-pointer outline-none hover:rotate-90 duration-300"
                                    title="Add New"
                                >+</button>
                            </div>
                        </Link>
                        <h1 className='create-title'>Create new post</h1>
                    </div>
                    <div className="category-panel mt-10 border border-grey shadow-md p-8 rounded-md">
                        <ul className='cm-panel category-list  text-left '>
                            <li className='rounded'><Link to='/home'><button className=''>Home</button></Link></li>
                            <li className='rounded'><button className=''>Manage Posts</button></li>
                            <li className='rounded'><Link to={`/update/${userData._id}`}><button className=''>Account Settings</button></Link></li>
                        </ul>
                    </div>

                </div>

                <div className='main-panel main-panel2 '>


                    <center>
                        <h2 className="register-head mb-5">Create new post</h2>
                        <form className="rounded-md w-3/4" onSubmit={handleSubmit(onSubmit)}>

                            {isSubmitted && !Object.keys(errors).length && (
                                <div className="pop p-3 bg-green-500 text-white  rounded mb-5"><p className="registered-heading">Posted successfully</p></div>
                            )}



                            <label htmlFor="songTitle">Song Title</label>
                            <input className="form-input" {...register('songTitle', {
                                required: 'This Field is required',
                                minLength: { value: 5, message: 'Minimum 5 characters are required' },
                                maxLength: { value: 20, message: 'Maximum length is 20 characters' }
                            })} placeholder="Enter the Song Title" id="songTitle" />
                            <br />
                            {errors.songTitle && <span className="error-span">{errors.songTitle.message}</span>}


                            <div className='flex items-center justify-between mb-5 mt-3'>
                                <div className='text-left'>
                                    <label htmlFor="artist">Artist</label>
                                    <input className="form-input artist-year mb-1" {...register('artist', {
                                        required: 'This Field is required',
                                        minLength: { value: 5, message: 'Minimum 5 characters are required' },
                                        maxLength: { value: 20, message: 'Maximum length is 20 characters' }
                                    })} placeholder="Enter the Artist name" id="artist" />
                                    <br />
                                    {errors.artist && <span className="error-span ">{errors.artist.message}</span>}
                                </div>


                                <div className='text-left ml-6'>
                                    <label htmlFor="releaseYear">Released Year</label>
                                    <input className="form-input artist-year mb-1  " {...register('releaseYear', {
                                        required: 'This Field is required',
                                        minLength: { value: 4, message: 'Minimum 4 characters are required' },
                                        maxLength: { value: 4, message: 'Maximum length is 4 characters' }
                                    })} placeholder="Enter the Release year" id="releaseYear" />
                                    <br />
                                    {errors.releaseYear && <span className="error-span">{errors.releaseYear.message}</span>}
                                </div>

                            </div>

                            <div className='text-left flex  items-center mb-1'>
                                <label className='mt-minus' htmlFor="imageVideo">Image/Video (Embedded)</label>

                                <span onClick={handleInfoModalToggle} className="info-icon flex items-center justify-center ml-2 ">i</span>
                            </div>
                            {showInfoModal && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <span className="close" onClick={handleInfoModalToggle}>&times;</span>
                                        <strong>Follow these steps only when you are pasting a video link</strong>
                                        <ul className='text-left mt-5 pl-10 steps'>
                                            <li>Find the video: Go to YouTube and find the video you want to embed.</li>
                                            <li>Click "Share" below the video.</li>
                                            <li>Select "Embed".</li>
                                            <li>Copy the link provided.</li>
                                            <li>Paste only the src url from the copied link here.</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <input className="form-input " {...register('imageVideo', {
                                required: 'This Field is required',
                                minLength: { value: 5, message: 'Minimum 5 characters are required' },
                            })} placeholder="Enter the Image/Video Link" id="imageVideo" />
                            <br />
                            {errors.imageVideo && <span className="error-span">{errors.imageVideo.message}</span>}

                            <label htmlFor="genre">Genre</label>
                            <input className="form-input" {...register('genre', {
                                required: 'This Field is required',
                                minLength: { value: 3, message: 'Minimum 3 characters are required' },
                            })} placeholder="Enter the Genre " id="genre" />
                            <br />
                            {errors.genre && <span className="error-span">{errors.genre.message}</span>}




                            <br />
                            <button className="submit-btn rounded">Post</button>

                        </form>



                    </center>

                </div>

            </div>
        </div>
    )
}

export default Create