import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

export default function Navbar() {

    const [user] = useAuthState(auth)

    const signUserOut = async () => {

        await signOut(auth)

    }

    return (
        <div className=' navbar'>
            <div className="links">
                <Link to='/'>HOME</Link>

                {user ? <Link to='/createpost'>CREATE POST</Link> : <Link to='/login'>LOGIN</Link> }
               
                

            </div>


            <div className='user'>

                {
                    user &&


                    <div>
                        <p>{user?.displayName}</p>
                        <img src={user?.photoURL || " "} alt='myImage' width='80' height='80' />
                        <button onClick={signUserOut} className="btn btn-dark mx-3">Sign Out</button>
                    </div>
                }

            </div>


        </div>
    )
}
