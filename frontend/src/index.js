import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import Layout from './components/Layout';
import MainScreen from './components/MainScreen/MainScreen';
import Login from './components/Login/Login';
import DrawRedAlert from './components/DrawRedAlert/DrawRedAlert'
import Setting from './components/Setting/Setting'
import OfficerRequestCard from './components/OfficerRequestCard/OfficerRequestcard';
import dummyStationData from './data/dummydata';
import servicedata from './data/servicedummy';

import "./font/Gilroy-Bold.ttf";
import "./font/Gilroy-Light.ttf";
import "./font/Gilroy-Medium.ttf";
import "./font/Gilroy-Regular.ttf";
import "./font/Gilroy-Thin.ttf";
import "./font/Gilroy-UltraLight.ttf";
import "./fonts.css";

if (!localStorage.getItem("notificationData")) {
  localStorage.setItem(
    "notificationData",
    JSON.stringify([])
  );
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Layout />} >
        <Route path='/' element={<MainScreen />} />
        <Route path='/create-red-alert-area' element={<DrawRedAlert />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/service-requests-card' element={<services Officerdetails={servicedata} />} />
        <Route path='/officer-requests-card' element={<OfficerRequestCard Officerdetails={dummyStationData} />} />
      </Route>
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);
