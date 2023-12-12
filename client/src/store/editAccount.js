import { createSlice } from "@reduxjs/toolkit"

//================================================Create============================================================================
export const setEdit = createSlice({
    name:'editAccount',
    initialState:{
        editAccount:false,
        

    },
    reducers:{
        setStateEdit: (state)=>{
            if(state.editAccount){
                state.editAccount = false
            }
            else{
                state.editAccount = true
            }
           
        },
    }
})
//==============================================Dispatch============================================================================
export const {setStateEdit} = setEdit.actions 
//===============================================Selector===========================================================================
export const selectEdit = (state) => state.editAccount.editAccount
//================================================Reducer===========================================================================

export default setEdit.reducer
