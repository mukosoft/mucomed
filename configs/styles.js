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
        margin: 10
    },
    themeContainer: {
        backgroundColor: lightTheme.colors.backgroundColor,
        height: '100%'
    }

}