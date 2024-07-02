import React ,{useContext , useState,useEffect} from 'react'
import Notes  from './Notes'



const Home = () => {
  
  const token = localStorage.getItem('token');


  return (
   <>
   

<Notes/>

   </>
  )
}

export default Home
