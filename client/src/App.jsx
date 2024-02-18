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
import Home from './pages/Home';
import QueryGenerator from './pages/QueryGenerator';
import CodeGenerator from './pages/CodeGenerator';
import NotFound from './pages/NotFound';

import Playground from './pages/Playground';
import Ace from './pages/Ace';
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    {/* <Route path='/chatPg' element={<ChatPg/>}/> */}
    <Route path='/query-generator' element={<QueryGenerator/>}/>
    <Route path='/code-generator' element={<CodeGenerator />} />
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