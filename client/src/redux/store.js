import { configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import message from './slices/messageSlice'
import theme from './slices/themeSlice'

export const store = configureStore({
    reducer: {
        user,
        message,
        theme
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})