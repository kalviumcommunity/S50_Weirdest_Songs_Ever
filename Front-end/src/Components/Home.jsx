import Logo from '../../assets/WSLogo.png'
import LogoW from '../../assets/WSLogowhite.png'

import postData from '../Postdata.json'
import profileImg from '../../assets/profile.png'



function Home() {
  return (
    <div>

      <div className="nav h-20 flex justify-center items-center border">
        <img className='logo h-10' src={LogoW} alt="" />
      </div>


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
          {postData.map((data, index) => {
            return (

              <div className="posts border flex flex-col mb-10 p-10" key={index}>
                <h1 className='post-title font-bold'>{data['Song Title']}</h1>
                <h3 className='post-username mb-5'>{data.Username}</h3>
                <iframe width="540" height="304" src={data['Image/Video']} title="video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <div className="post-options bg-gray-700 rounded text-white p-3 flex items-center  justify-between  mt-5">

                  <h1>Artist: {data.Artist}</h1>
                  <h1>Release Year: {data['Release Year']}</h1>
                  {/* <button>Like</button> */}

                </div>

              </div>
            )
          })}
        </div>

        <div className="right-panel m-12  ">

          <div className="cm-panel profile-panel bg-white border shadow-md p-8 boder rounded-md flex items-center justify-between h-20">

            <div className='profile-img-name  flex items-center justify-around  '>
              <div className="profile-img w-14 h-14 rounded-full flex justify-center items-center overflow-hidden">
                <img src={profileImg} alt="Img" />
              </div>
              <h1 className='profile-name '>marques</h1>
            </div>

            <button className='logout-stroke text-red-500' alt='logout'>-</button>

          </div>



        </div>

      </div>




    </div>
  )
}

export default Home