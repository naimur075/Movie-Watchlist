import React,{useState} from 'react'
import {useAuth} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

export default function Login(){
  const {login}=useAuth()
  const nav=useNavigate()
  const [email,setEmail]=useState('')
  const [pw,setPw]=useState('')

  const submit=async(e)=>{
    e.preventDefault()
    await login(email,pw)
    nav('/search')
  }

  return <form onSubmit={submit} className='p-4 flex flex-col gap-2'>
    <input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)}/>
    <input placeholder='password' type='password' value={pw} onChange={e=>setPw(e.target.value)}/>
    <button>Login</button>
  </form>
}