import { colors } from "./colors";
import {darkTheme, lightTheme} from "./PaperTheme";

export const defaultStyles = {
    defaultShadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    defaultButton: {
        margin: 2.5
    },
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
        shadowColor: colors.grey_dark,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 7,
    }
}