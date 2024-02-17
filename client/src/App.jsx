import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"

import Layout from './components/Layout';
// import ChatPg from './pages/ChatPg';
import Home from './pages/InputOutput';
import NotFound from './pages/NotFound';
// import Home1 from './pages/Home'
import Cp from './pages/InputOutput';
import Playground from './pages/Playground';
import Ace from './pages/Ace';
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    {/* <Route path='/chatPg' element={<ChatPg/>}/> */}
    <Route path='/cp' element={<Cp/>}/>
    <Route path='/pg' element={<Playground/>}/>
    <Route path='/ace' element={<Ace/>}/>
    <Route path="*" element={<NotFound />} />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}