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
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate()

  const cookieUserData = Cookies.get('userData');
  const userData = cookieUserData ? JSON.parse(cookieUserData) : null;

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userData');
    setUsername('');

    console.log('logout')

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

  // console.log(users)


  return (
    <div>

      <nav className="nav h-20 flex justify-center items-center border">
        <img className='logo h-10' src={LogoW} alt="" />
      </nav>


      <div className="panels flex justify-around  ">

        <div className='left-panel m-12  '>

          <div className="add-post flex justify-between items-center ">

            <div className="add-btn  w-16 h-16 rounded-full">
              <button
                className="plus rounded-full text-white text-md cursor-pointer outline-none hover:rotate-90 duration-300"
                title="Add New"
              >+</button>
            </div>

            <h1 className='create-title'>Create new post</h1>

          </div>


          <div className="category-panel mt-10 border border-grey shadow-md p-8 rounded-md">
            <ul className='cm-panel category-list  text-left '>
              <li className='rounded'><button className=''>Home</button></li>
              <li className='rounded'><button className=''>Manage Posts</button></li>
              <li className='rounded'><button className=''>Settings</button></li>
            </ul>
          </div>

        </div>



        <div className='main-panel m-12 '>


          {posts.map((data, index) => {
            return (

              <div className="posts border flex flex-col mb-10 p-10" key={index}>
                <h1 className='post-title font-bold'>{data['Song Title']}</h1>
                <h3 className='post-username mb-5'>{data.Username}</h3>
                <iframe width="540" height="304" src={data['Image/Video']} title="video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <div className="post-options bg-gray-700 rounded text-white p-3 flex items-center  justify-between  mt-5">

                  <h1>Artist: <strong>{data.Artist}</strong></h1>
                  <h1>Release Year: <strong>{data['Release Year']}</strong></h1>

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