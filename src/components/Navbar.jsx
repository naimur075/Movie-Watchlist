import React from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

export default function Navbar(){
  const {user,logout}=useAuth()
  return <nav className='p-4 bg-gray-800 text-white flex gap-4'>
    <Link to='/search'>Search</Link>
    {user && <Link to='/watchlist'>Watchlist</Link>}
    {!user && <Link to='/login'>Login</Link>}
    {!user && <Link to='/signup'>Signup</Link>}
    {user && <button onClick={logout}>Logout</button>}
  </nav>
}