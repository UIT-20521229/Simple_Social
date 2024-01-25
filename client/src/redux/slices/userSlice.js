import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: null,
    userId: "",
    userLoading: false,
    isLogged: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
        },
        setUserId(state, action) {
            state.userId = action.payload
        },
        setUserLoading(state, action) {
            state.userLoading = action.payload
        },
        setIsLogged(state, action) {
            state.isLogged = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUsers, setUserId, setUserLoading, setIsLogged } = userSlice.actions

export default userSlice.reducer