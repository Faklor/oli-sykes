import { configureStore } from '@reduxjs/toolkit'
import setPointMenu from './nowPointMenu'
import nowUser from './nowUser'
import editAccount  from './editAccount'

//---------------persist----------------------
import storage from 'redux-persist/lib/storage'
//import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'


// const reducers = combineReducers({
//   nowPointMenu: setPointMenu,
//   user:nowUser,           
// })
 
const persistConfig = {
  key: 'root',
  storage
}
 
 
const persistedReducer = persistReducer(persistConfig, nowUser)

//========================================================================
const store = configureStore({
  reducer: {
    user:persistedReducer,
    nowPointMenu: setPointMenu,
    editAccount: editAccount,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})
//========================================================================


export default store