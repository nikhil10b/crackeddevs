import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Lander from '../Pages/Lander';
function routes() {
    return (

       <Routes>
        <Route path='/' element={<Lander/>} />
        </Routes>

  )
}

export default routes;