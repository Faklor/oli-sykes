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
        setDefaultImage:(state,action)=>{
            if(state.user !== null){
                
                if(state.user.filename === null){
                    state.user.filename = action.payload
                }
            }
            
        }
    }
})
//==============================================Dispatch============================================================================
export const {setStateUser, setDefaultImage} = setUser.actions 
//===============================================Selector===========================================================================
export const selectUser = (state) => state.user.user
//================================================Reducer===========================================================================

export default setUser.reducer
