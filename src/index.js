import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
//===============redux=======================
import store from './store/store'
import { Provider } from 'react-redux'
//----------------persist--------------------
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
//============components=====================
import Home from './home/home'
import Music from './music/music'
import Blog from './blog/blog'
//--------------User-------------------------
import User from './user/user'
import Cabinet from './user/cabinet'
import SignIn from './user/signIn'
//import SignUp from './user/signUp'
import hoc from './user/HocSing'

//============components=====================
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  
} from "react-router-dom"
//==============parallax=====================

let SignUp = hoc()(SignIn)

const router = createBrowserRouter([
  { path:'/', element:<Navigate to='/Home' replace={true}/> },
  { path: "/Home", element: <Home/> },
  { path:'/Music', element:<Music/> },
  { path: "/Blog", element: <Blog/> },
  //---------------------User-------------------------------
  { path: "/User", element:<User/>,
    children:[
      { path: '/User/', element:<Cabinet/>,  },
      { path: '/User/signIn', element:<SignIn/> },
      { path: '/User/signUp', element:<SignUp/> }
    ]
  },
  
])

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>  
  </React.StrictMode>
);

reportWebVitals();
