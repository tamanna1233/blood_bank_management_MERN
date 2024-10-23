import { configureStore } from "@reduxjs/toolkit";
import authslice from './slice'
const store = configureStore({
    reducer: {
        auth: authslice
        }
})
export default store