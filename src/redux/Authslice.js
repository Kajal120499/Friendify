const { createSlice } = require("@reduxjs/toolkit");

const Authslice = createSlice({
    name:'auth',
    initialState:{
        data:null
    },

    reducers:{
        setAuthData(state,action){
            state.data=action.payload
        }
    }
})

export const {setAuthData} =Authslice.actions
export default Authslice.reducer