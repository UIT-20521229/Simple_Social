import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    like: false,
    share: false,
    comment: false,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setLike: (state, action) => {
            state.like = !state.like
        },
        setShare: (state, action) => {
            state.share = !state.share
        },
        setComment: (state, action) => {
            state.comment = !state.comment
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLike, setShare, setComment } = postSlice.actions

export default postSlice.reducer