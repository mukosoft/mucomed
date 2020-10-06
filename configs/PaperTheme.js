import {DefaultTheme} from "react-native-paper";
import {colors} from "./colors";

export default {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF',
        accent: colors.turquoise_dark,
        primary: colors.turquoise_light,
    },

    roundness: 8,
}