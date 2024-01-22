import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    like: Boolean,
    share: Boolean,
    comment: Boolean,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setLike: (state, action) => {
            state.like = action.payload
        },
        setShare: (state, action) => {
            state.share = action.payload
        },
        setComment: (state, action) => {
            state.comment = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLike, setShare, setComment } = postSlice.actions

export default postSlice.reducer