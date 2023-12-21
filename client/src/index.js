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
import PrivateRoute from './privateRoute'
import PrivateDash from './privateDash'
//--------------Home-------------------------
import Home from './home/home'
//--------------Music------------------------
import Music from './music/music'
//-------------------------------------------
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

import {
  users,
  songAll,
  albums,
  blogs
} from './components/axiosRouterGet'
import {
  //song
  addSong,
  deleteSong,
  editSong,
  //album
  addAlbum,
  updateAlbum,
  deleteAlbum,
  //post
  addPost,
  updatePost,
  deletePost
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
titles:['id','login','email','created','lastEdit']})(Dash)
const Songs = hocDash({lable:'songs',method:songAll,
titles:['id','title','video Id','album','created','delete'],addItem:addSong, deleteItemMethod:deleteSong, editItem:editSong})(Dash)
const Albums = hocDash({lable:'albums',method:albums, 
titles:['id','title','imageUrl','created','lastEdit','delete'],addItem:addAlbum, deleteItemMethod:deleteAlbum,editItem:updateAlbum})(Dash)
const Posts = hocDash({lable:'posts',method:blogs, 
titles:['id','title','imageUrl','created','lastEdit','delete'],addItem:addPost, deleteItemMethod:deletePost,editItem:updatePost})(Dash)


const router = createBrowserRouter([
  { path:'/', element:<Navigate to='/Home' replace={true}/> },
  { path: "/Home", element: <Home/> },
  { path:'/Music', element:<Music/>,
    children:[
      {
        path:':albumsName', element:<></>,
      }
    ]  
  },
  { path: "/Blog", element: <Blog/>,children:[
    {path:":numberPosts"}
  ]},
  //---------------------User-------------------------------
  { path: "/User", element:<User/>,
    children:[
      { path: ':userName', element:<PrivateRoute component={<Cabinet/>}/> },
      { path: 'signIn', element:<SignIn status={['Login','SignIn', 'Create Account', 'signUp','login']}/>},
      { path: 'signUp', element:<SignUp/> },
      { path: 'dashboard', element:<PrivateDash component={<Dashboard/>}/>, children:[
        {path: 'graph', element:<DashGraph/>},
        {path: 'users', element:<Users/>, children:[
          { path:':item',  element:<Dash/> }
        ]},
        {path: 'music', element:<Songs/>},
        {path: 'blogs', element:<Posts/>},
        {path: 'albums', element:<Albums/>},
        {path: ':userName', element:<Cabinet/>},
      ]},
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
