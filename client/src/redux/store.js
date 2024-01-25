import { configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import message from './slices/messageSlice'
import theme from './slices/themeSlice'
import post from './slices/postSlice'

export const store = configureStore({
    reducer: {
        user,
        message,
        theme,
        post
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})