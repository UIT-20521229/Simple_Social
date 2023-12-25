import { configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import message from './slices/messageSlice'
import { get } from 'mongoose'

export const store = configureStore({
    reducer: {
        user,
        message,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})