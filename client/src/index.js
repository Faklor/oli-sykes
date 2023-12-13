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
import hoc from './user/hoc/HocSing'
//-------------dashboard---------------------
import Dashboard from './user/dashboard'
import Dash from './user/components/dash'
import DashGraph from './user/components/dashGraph'
import hocDash from './user/hoc/hocDash'
import DashContent from './user/components/dashContent';

import {
  users,
  songAll
} from './components/axiosRouterGet'
import {
  addSong
} from './components/axiosRouterPost'
//============components=====================
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  
} from "react-router-dom"
//==============parallax=====================

const SignUp = hoc(['Register','SignUp', 'Sign In', 'signIn','registration'])(SignIn)

//----------------dash-----------------------
const Users = hocDash({lable:'users',method:users, 
titles:['id','login','email','created','lastEdit','delete']})(Dash)
const Songs = hocDash({lable:'songs',method:songAll,
titles:['id','title','url','album','created','edit','delete'],addItem:addSong})(Dash)



const router = createBrowserRouter([
  { path:'/', element:<Navigate to='/Home' replace={true}/> },
  { path: "/Home", element: <Home/> },
  { path:'/Music', element:<Music/>,
    children:[
      {
        path:'albums/:albumsId'
      }
    ]  
  },
  { path: "/Blog", element: <Blog/> },
  //---------------------User-------------------------------
  { path: "/User", element:<User/>,
    children:[
      { path: ':userName', element:<Cabinet/> },
      { path: 'signIn', element:<SignIn status={['Login','SignIn', 'Create Account', 'signUp','login']}/>},
      { path: 'signUp', element:<SignUp/> },
      { path: 'dashboard', element:<Dashboard/>, children:[
        {path: 'graph', element:<DashGraph/>},
        {path: 'users', element:<Users/>, children:[
          { path:':item',  element:<DashContent/> }
        ]},
        {path: 'music', element:<Songs/>},
        {path: 'blogs', element:<Users/>},
      ]}
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
