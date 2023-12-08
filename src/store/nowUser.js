import { createSlice } from "@reduxjs/toolkit"

//================================================Create============================================================================
export const setUser = createSlice({
    name:'user',
    initialState:{
        user:null,
        

    },
    reducers:{
        setStateUser: (state, action)=>{
            
           state.user = action.payload
        },
    }
})
//==============================================Dispatch============================================================================
export const {setStateUser} = setUser.actions 
//===============================================Selector===========================================================================
export const selectUser = (state) => state.user.user
//================================================Reducer===========================================================================

export default setUser.reducer
