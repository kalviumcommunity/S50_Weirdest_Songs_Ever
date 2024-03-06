import LogoW from '../../assets/WSLogowhite.png';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function UpdatePost() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const cookieUserData = Cookies.get('userData');
    const userData = cookieUserData ? JSON.parse(cookieUserData) : null;

    const getEmbeddedVideoUrl = (videoLink) => {
        if (videoLink.includes('youtu.be')) {
            const videoId = videoLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
        return videoLink;
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then(response => {
                setPost(response.data);
                setValue('songTitle', response.data.songTitle);
                setValue('artist', response.data.artist);
                setValue('releaseYear', response.data.releaseYear);
                setValue('imageVideo', response.data.imageVideo);
                setValue('genre', response.data.genre);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id, setValue]);

    const onSubmit = data => {
        const { songTitle, artist, releaseYear, imageVideo, genre } = data;
        const embeddedVideoUrl = getEmbeddedVideoUrl(imageVideo);
        const updatedPost = { songTitle, artist, releaseYear, imageVideo: embeddedVideoUrl, genre };
    
        axios.put(`http://localhost:3000/posts/${id}`, updatedPost)
            .then(response => {
                console.log(response);
                setIsSubmitted(true); 
                setTimeout(() => {
                    navigate('/posts');
                }, 1000);
            })
            .catch(error => {
                console.error(error);
            });
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
                            <li className='rounded'><Link to='/posts'><button className=''>Manage Posts</button></Link></li>
                            <li className='rounded'><Link to={`/update/${userData._id}`}><button className=''>Account Settings</button></Link></li>
                        </ul>
                    </div>
                </div>
                <div className='main-panel main-panel2 '>
                    <center>
                        <h2 className="register-head mb-5">Update Post</h2>
                        {/* Success message */}
                        {isSubmitted && !Object.keys(errors).length && (
                            <div className="pop w-3/4 p-3 bg-green-500 text-white  rounded mb-5"><p className="registered-heading">Updated successfully</p></div>
                        )}
                        <form className="rounded-md w-3/4" onSubmit={handleSubmit(onSubmit)}>
                            {/* Form fields */}
                            <label htmlFor="songTitle">Song Title</label>
                            <input
                                className="form-input"
                                {...register('songTitle', {
                                    required: 'This Field is required',
                                    minLength: { value: 5, message: 'Minimum 5 characters are required' },
                                    maxLength: { value: 20, message: 'Maximum length is 20 characters' }
                                })}
                                placeholder="Enter the Song Title"
                                id="songTitle"
                            />
                            {errors.songTitle && <span className="error-span">{errors.songTitle.message}</span>}
                            <br />
                            {/* Other form fields */}
                            <label htmlFor="artist">Artist</label>
                            <input
                                className="form-input"
                                {...register('artist', {
                                    required: 'This Field is required',
                                    minLength: { value: 5, message: 'Minimum 5 characters are required' },
                                    maxLength: { value: 20, message: 'Maximum length is 20 characters' }
                                })}
                                placeholder="Enter the Artist name"
                                id="artist"
                            />
                            {errors.artist && <span className="error-span">{errors.artist.message}</span>}
                            <br />
                            <label htmlFor="releaseYear">Released Year</label>
                            <input
                                className="form-input"
                                {...register('releaseYear', {
                                    required: 'This Field is required',
                                    minLength: { value: 4, message: 'Minimum 4 characters are required' },
                                    maxLength: { value: 4, message: 'Maximum length is 4 characters' }
                                })}
                                placeholder="Enter the Release year"
                                id="releaseYear"
                            />
                            {errors.releaseYear && <span className="error-span">{errors.releaseYear.message}</span>}
                            <br />
                            <label htmlFor="imageVideo">Image/Video URL</label>
                            <input
                                className="form-input"
                                {...register('imageVideo', {
                                    required: 'This Field is required',
                                    minLength: { value: 5, message: 'Minimum 5 characters are required' },
                                })}
                                placeholder="Enter the Image/Video Link"
                                id="imageVideo"
                                onBlur={(e) => {
                                    e.target.value = getEmbeddedVideoUrl(e.target.value);
                                }}
                            />
                            {errors.imageVideo && <span className="error-span">{errors.imageVideo.message}</span>}
                            <br />
                            <label htmlFor="genre">Genre</label>
                            <input
                                className="form-input"
                                {...register('genre', {
                                    required: 'This Field is required',
                                    minLength: { value: 3, message: 'Minimum 3 characters are required' },
                                })}
                                placeholder="Enter the Genre"
                                id="genre"
                            />
                            {errors.genre && <span className="error-span">{errors.genre.message}</span>}
                            <br />
                            <button className="submit-btn rounded">Update</button>
                        </form>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default UpdatePost;
