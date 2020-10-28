import {DarkTheme, DefaultTheme} from "react-native-paper";
import {colors} from "./colors";

export const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF',
        accent: colors.turquoise_dark,
        primary: colors.turquoise_light,
        surface: colors.white,
        backgroundColor: '#FAFAFA'
    },
    fonts: {
        regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'sans-serif-light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: 'normal',
        },
    },
    roundness: 8,
}

export const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#FFFFFF',
        accent: colors.turquoise_dark,
        primary: colors.turquoise_light,
        surface: colors.turquoise_dark,
        backgroundColor: colors.turquoise_dark
    },
    fonts: {
        regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'sans-serif-light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: 'normal',
        },
    },
    roundness: 8,
}