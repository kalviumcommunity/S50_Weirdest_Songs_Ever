import LogoW from '../../assets/WSLogowhite.png'
import axios from 'axios'
import profileImg from '../../assets/profile.png'
import personalIng from '../../assets/personalprof.png'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate()

  const cookieUserData = Cookies.get('userData');
  const userData = cookieUserData ? JSON.parse(cookieUserData) : null;

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userData');
    setUsername('');
    navigate('/')
    setIsLogoutPopupOpen(false);
  };

  const handleNoClick = () => {
    setIsLogoutPopupOpen(false);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedUser === '' || selectedUser === 'All') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.username === selectedUser);
      setFilteredPosts(filtered);
    }
  }, [selectedUser, posts]);

  const uniqueUsernames = Array.from(new Set(posts.map(post => post.username)));


  return (
    <div>
      <nav className="nav h-20 flex justify-center items-center border">
        <img className='logo h-10' src={LogoW} alt="" />
      </nav>

      <div className="panels flex justify-around">
        <div className='left-panel m-12  '>
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
              <li className='rounded'><button className=''>Home</button></li>
              <li className='rounded'><Link to='/posts'><button className=''>Manage Posts</button></Link></li>
              <li className='rounded'><Link to={`/update/${userData._id}`}><button className=''>Account Settings</button></Link></li>
            </ul>
          </div>
        </div>

        <div className='main-panel m-12 '>
        <select className='border border-gray-400 rounded px-2 py-4' id="genreSelect" onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select the creator </option>
            <option value="All">All</option>
            {uniqueUsernames.map(username => (
              <option key={username} value={username}>{username}</option>
            ))}
          </select>

          {filteredPosts.map((data, index) => {
            return (
              <div className="posts border flex flex-col mb-10 p-10" key={index}>
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
                <iframe width="540" height="304" src={data.imageVideo} title="video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <div className="post-options bg-gray-700 rounded text-white p-3 flex items-center  justify-between  mt-5">
                  <h1>Artist: <strong>{data.artist}</strong></h1>
                  <h1>Release Year: <strong>{data.releaseYear}</strong></h1>
                </div>
              </div>
            )
          })}
        </div>

        <div className="right-panel m-12 overflow-hidden ">
          <div className="mb-5 cm-panel  profile-panel bg-white border shadow-md p-8 boder rounded-md flex items-center justify-between h-20">
            <div className="profile-img w-14 h-14 rounded-full flex justify-center items-center overflow-hidden">
              <img src={personalIng} className='h-20 w-20' alt="Img" />
            </div>
            <div className='profile-img-name  flex items-center justify-between  '>
              <Link to={`/update/${userData._id}`}><h1 className='profile-name user-name '>{userData.username}</h1></Link>
            </div>
            <div className="toggle-switch">
              <input onClick={() => setIsLogoutPopupOpen(prevState => !prevState)} checked={isLogoutPopupOpen} className="toggle-input" id="toggle" type="checkbox" />
              <label className="toggle-label" htmlFor="toggle"></label>
            </div>
            {isLogoutPopupOpen && (
              <div>
                <div className="overlay"></div>
                <div className="border logout-popup p-5 rounded flex flex-col justify-around ">
                  <h2>Are you sure you want to logout?</h2>
                  <div>
                    <button onClick={handleLogout} className='py-3 px-5 mr-5 rounded bg-red-500 text-white font-bold hover:bg-red-400'>Yes</button>
                    <button onClick={handleNoClick} className='py-3 px-5 ml-5 border rounded  text-black font-bold'>No</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <center>
            <hr className='bg-gray mt-6 mb-6 w-3/4' />
            <h1 className='suggestion-title mb-6'>Suggested for you</h1>
          </center>
          <div className=' suggestion-scroll h-3/4 overflow-scroll p-2   rounded-lg  '>
            {users.map((user, index) => {
              return (
                <div key={index} className="mb-5 cm-panel profile-panel bg-white border  p-8 boder rounded-md flex items-center justify-between h-20">
                  <div className="profile-img w-14 h-14 rounded-full flex justify-center items-center overflow-hidden">
                    <img src={profileImg} alt="Img" />
                  </div>
                  <div className='profile-img-name flex items-center justify-between'>
                    <h1 className='profile-name ml-2'>{user.username}</h1>
                  </div>
                  <button className='logout-stroke text-blue-500 ' alt='logout'>+</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
