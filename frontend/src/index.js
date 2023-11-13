import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import MainScreen from './components/MainScreen/MainScreen';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

console.log("Process", process.env);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<MainScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
