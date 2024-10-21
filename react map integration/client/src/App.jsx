import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MapTwo from './Pages/MapTwo';
import Map from './Pages/Map';


export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Map />} />
            <Route path='/maptwo' element={<MapTwo />} />
        </Routes>
    </BrowserRouter>
  )
}
