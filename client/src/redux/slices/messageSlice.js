import { createSlice } from '@reduxjs/toolkit'
import { GiftedChat } from 'react-native-gifted-chat';

const initialState = {
    message: [],
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        sendMessage(state, action) {
            state.message = GiftedChat.append(state.message, action.payload)
            console.log(state.message)
        },
        reset: state => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { sendMessage, reset } = messageSlice.actions

export default messageSlice.reducer