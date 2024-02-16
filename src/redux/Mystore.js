const { configureStore } = require("@reduxjs/toolkit");
import AuthReducer from './Authslice'

const Mystore= configureStore({
    reducer:{
        auth:AuthReducer
    }
})

export default Mystore