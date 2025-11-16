import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import MovieDetails from './pages/MovieDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from './utils/ProtectedRoute';

export default function App(){
  return <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Navigate to='/search' replace/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/movie/:id' element={<MovieDetails/>}/>
      <Route path='/watchlist' element={<ProtectedRoute><Watchlist/></ProtectedRoute>}/>
    </Routes>
  </>
}