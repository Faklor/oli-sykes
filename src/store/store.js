import { configureStore } from '@reduxjs/toolkit'
import setPointMenu from './nowPointMenu'
import nowUser from './nowUser'

//---------------persist----------------------
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'


const reducers = combineReducers({
  nowPointMenu: setPointMenu,
  user:nowUser,           
 });
 
 const persistConfig = {
     key: 'root',
     storage
 };
 
 const persistedReducer = persistReducer(persistConfig, reducers);

//========================================================================
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})
//========================================================================




export default store