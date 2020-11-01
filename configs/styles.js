import { colors } from "./colors";
import {darkTheme, lightTheme} from "./PaperTheme";

export const defaultStyles = {
    defaultContentContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10, 
        marginRight: 10,
        marginTop: 10
    },
    themeContainer: {
        backgroundColor: lightTheme.colors.backgroundColor,
        height: '100%',
    },
    defaultShadow: {
        borderWidth: 0.25,
        borderColor: colors.turquoise_dark,
        // shadowColor: colors.grey_dark,
        // shadowOffset: {
        //     width: 1,
        //     height: 1,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        elevation: 0,
    },
    defaultBorderRadius: {
        borderRadius: 5
    }
}