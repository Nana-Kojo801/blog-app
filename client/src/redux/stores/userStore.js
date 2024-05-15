import { createSlice } from "@reduxjs/toolkit";

const initial_user = {
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState: initial_user,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer