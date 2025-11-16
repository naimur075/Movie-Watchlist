import React,{createContext,useContext,useEffect,useState} from 'react'
import {auth} from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'

const AuthContext=createContext()
export const useAuth=()=>useContext(AuthContext)

export function AuthProvider({children}){
  const [user,setUser]=useState(null)

  useEffect(()=>{
    return onAuthStateChanged(auth, setUser)
  },[])

  const login=(email,pw)=>signInWithEmailAndPassword(auth,email,pw)
  const signup=(email,pw)=>createUserWithEmailAndPassword(auth,email,pw)
  const logout=()=>signOut(auth)

  return <AuthContext.Provider value={{user,login,signup,logout}}>
    {children}
  </AuthContext.Provider>
}