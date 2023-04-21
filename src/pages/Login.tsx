import React from 'react'
import {auth, provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()

const signInWithgoogle = async () =>{

    

    const result = await signInWithPopup(auth, provider)
    navigate("/")


}





  return (
    <div className='my-3'>
      <h6>Sign In With Google to Continue</h6>
      <button onClick={signInWithgoogle} className='btn btn-dark'>Sign In With Google</button>

    </div>
  )
}
