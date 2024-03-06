import LogoW from '../../assets/WSLogowhite.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

function ManagePosts() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deletePostId, setDeletePostId] = useState(null);

    const cookieUserData = Cookies.get('userData');
    const userData = cookieUserData ? JSON.parse(cookieUserData) : null;

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(response => {
                setPosts(response.data);
                const filtered = response.data.filter(post => post.username === userData.username);
                setFilteredPosts(filtered);
            })
            .catch(err => {
                console.log(err);
            });
    }, [userData.username]);

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/posts/${deletePostId}`)
            .then(response => {
                console.log(response);
                setFilteredPosts(filteredPosts.filter(post => post._id !== deletePostId));
                setShowDeleteConfirmation(false);
            })
            .catch(err => {
                console.log(err);
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
                        <h2 className="register-head mb-5">Your posts</h2>
                        {filteredPosts.map((data, index) => {
                            return (
                                <div className="posts posts2 border flex flex-col mb-10 p-10" key={index}>
                                    <div className=' top-opt flex justify-between items-center'>
                                        <div className=''>
                                            <h1 className='post-title font-bold'>{data.songTitle}</h1>
                                            <h3 className='post-username mb-5'>{data.username}</h3>
                                        </div>
                                        <div>
                                            <div className="post-top mb-5 rounded text-white p-3 flex items-center  justify-between">
                                                <h1><strong>{data.genre}</strong></h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-between'>
                                        <iframe width="540" height="304" src={data.imageVideo} title="video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                        <div className='flex flex-col update-opt'>
                                            <Link to={`/edit/${data._id}`}>
                                                <button className="update-btn py-3 px-5 rounded bg-blue-900 text-white font-bold hover:bg-blue-600">Edit</button>
                                            </Link>
                                            <button onClick={() => {
                                                setShowDeleteConfirmation(true);
                                                setDeletePostId(data._id);
                                            }} className="update-btn py-3 px-5 rounded bg-red-500 text-white font-bold hover:bg-red-400 mt-2">Delete</button>
                                        </div>
                                    </div>

                                    {showDeleteConfirmation && (
                                        <div>
                                            <div className="overlay"></div>
                                            <div className="border delete-popup logout-popup rounded flex flex-col justify-around ">
                                                <h2 className='mb-7'>Are you sure you want to delete your post?</h2>
                                                <div>
                                                    <button onClick={handleDelete} className='py-3 px-5 mr-5 rounded bg-red-500 text-white font-bold hover:bg-red-400'>Yes</button>
                                                    <button onClick={() => setShowDeleteConfirmation(false)} className='py-3 px-5 ml-5 border rounded  text-black font-bold'>No</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="post-options bg-gray-700 rounded text-white p-3 flex items-center  justify-between  mt-5">
                                        <h1>Artist: <strong>{data.artist}</strong></h1>
                                        <h1>Release Year: <strong>{data.releaseYear}</strong></h1>
                                    </div>
                                </div>
                            );
                        })}
                    </center>
                </div>
            </div>
        </div>
    );
}

export default ManagePosts;
