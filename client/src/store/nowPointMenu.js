import { createSlice } from "@reduxjs/toolkit"

//================================================Create============================================================================
export const pointMenu = createSlice({
    name:'nowPointMenu',
    initialState:{
        nowPointMenu:[],
        

    },
    reducers:{
       setPointMenu:(state, action)=>{
           
          
       }
    }
})
//==============================================Dispatch============================================================================
export const {setPointMenu} = pointMenu.actions 
//===============================================Selector===========================================================================
export const selectItems = (state) => state.nowPointMenu.nowPointMenu
//================================================Reducer===========================================================================

export default pointMenu.reducer
