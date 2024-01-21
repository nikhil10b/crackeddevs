import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Lander from '../pages/Lander';
import Notes from '../pages/Notes';

function routes() {
    return (
       
       <Routes>
        <Route path='/' element={<Lander />} />
        <Route path='/notes' element={<Notes />} />
       </Routes>
       )
    }
    
    export default routes;