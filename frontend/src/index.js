import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import MainScreen from './components/MainScreen/MainScreen';
import Login from './components/Login/Login';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<MainScreen />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
