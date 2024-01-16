import { createSlice } from '@reduxjs/toolkit'
import { Appearance } from 'react-native'

const colorScheme = Appearance.getColorScheme();

const initialState = {
    theme: colorScheme,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setTheme, reset } = themeSlice.actions

export default themeSlice.reducer