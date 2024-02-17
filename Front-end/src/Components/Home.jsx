import { Routes, Route, Link } from 'react-router-dom'
import Github from '../../assets/github.png'
import Linkedin from '../../assets/linkedin.png'

function Home() {
  return (
    <div className='main'>

        <h1 className='title mt-12'>Weirdest Songs Ever</h1>
        <div className='description mt-10'>
            <p>This website showcases a curated selection of some of the most weirdest and unconventional songs ever produced. These tracks are distinguished by their eccentric lyrics, distinct melodies, and unconventional musical arrangements, offering a humorous and captivating assortment of offbeat musical experiences for visitors to enjoy.</p>
        </div>


        <div className='buttons mt-5'>
        <button className='btn login '>Login</button>
          <button className='btn signup'>Sign up</button>
        </div>

        <hr className='mt-10'/>

        <div className='social-links w-30 flex justify-around mt-5 p-1'>
                <Link to='https://github.com/abdullashahil'><img className='social-logo h-8 mr-1' src={Github} alt=""/></Link>
    <Link to='https://www.linkedin.com/in/abdullashahil/'><img className='social-logo h-8 ml-1' src={Linkedin} alt="" /></Link>
        </div>

    </div>
  )
}

export default Home